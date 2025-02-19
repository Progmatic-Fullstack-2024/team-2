import prisma from "../models/prisma-client.js";
import { createFiles, deleteFiles, updateFiles } from "./file.service.js";
import HttpError from "../utils/HttpError.js";
import performanceEventsService from "./performanceEvents.service.js";

const getById = async (performanceId) => {
  const performance = await prisma.performance.findUnique({
    where: { id: performanceId },
    include: {
      performanceEvents: true,
      creators: true,
      futurePerformance: true,
      performanceFollowers: true,
    },
  });
  if (!performance) throw new HttpError("Performance not found", 404);
  return performance;
};

const getByName = async (title) => {
  const performance = await prisma.performance.findUnique({
    where: { title },
  });
  if (!performance) throw new HttpError("Performance not found", 404);
  return performance.id;
};

const isOwn = async (id, userId) => {
  const isOwnPerformance = await prisma.performance.findUnique({
    where: {
      id,
      theater: {
        admins: { some: { userId } },
      },
    },
    include: {
      theater: {
        include: {
          admins: true,
        },
      },
    },
  });
  return isOwnPerformance;
};

const list = async ({ filter, search }) => {
  const { orderBy, where } = filter;

  const performances = await prisma.performance.findMany({
    where: {
      ...where,
      title: { contains: search, mode: "insensitive" },
    },
    include: {
      // performanceEvents: orderBy === "performanceDate" ? orderBy : true,
      performanceEvents: true,
      theater: true,
      genre: !!filter.genre,
      creators: !!filter.creators,
    },

    orderBy:
      Object.keys(orderBy)[0] === "performanceDate" ? undefined : orderBy,
  });
  if (!performances) throw new HttpError("Performances not found", 404);
  // custom skip and take
  // console.log(performances);

  const filteredPerformances = performances.filter(
    (item, index) => index >= filter.skip && index < filter.skip + filter.take
  );
  // console.log(filteredPerformances);
  return { data: filteredPerformances, maxSize: performances.length };
};

const listAll = async () => {
  const allPerformances = await prisma.performance.findMany({
    include: {
      performanceEvents: true,
      theater: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
      genre: true,
      futurePerformance: true,
      creators: true,
    },
  });
  return allPerformances;
};

const listAllGenres = async () => {
  const genresWithCount = await prisma.genre.groupBy({
    by: ["name"], // Grouping based on genre
    _count: {
      name: true, // Count genres
    },
  });

  return genresWithCount.map((g) => ({
    name: g.name,
    // eslint-disable-next-line no-underscore-dangle
    count: g._count.name,
  }));
};

const create = async (performanceData, poster, images, creatorsIds) => {
  try {
    const posterURL = await createFiles([poster]);
    const imageUrls = await createFiles(images);
    const newPerformance = await prisma.performance.create({
      data: {
        ...performanceData,
        posterURL: posterURL[0],
        imagesURL: imageUrls,
        creators: { connect: creatorsIds },
      },
    });
    return newPerformance;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to create performance",
      error.status || 500
    );
  }
};

const update = async (
  performanceId,
  performanceData,
  poster,
  images,
  creatorsIds,
  performanceEventIds
) => {
  try {
    const performanceToUpdate = await getById(performanceId);

    const posterURL = poster
      ? await updateFiles([performanceToUpdate.posterURL], [poster])
      : [performanceToUpdate.posterURL];

    let imageUrls = performanceToUpdate.imagesURL;
    if (images && images.length) {
      const newImageUrls = await createFiles(images);
      imageUrls = [...imageUrls, ...newImageUrls];
    }

    console.log("creatorsIds:", creatorsIds);
    console.log("performanceEventIds (after delete):", performanceEventIds);

    // **Lekérjük a jelenlegi események ID-it**
    const existingEventIds = performanceToUpdate.performanceEvents.map(
      (event) => event.id
    );

    // **Megnézzük, mely eseményeket kell törölni**
    const eventsToRemove =
      Array.isArray(performanceEventIds) && performanceEventIds.length > 0
        ? existingEventIds.filter((id) => !performanceEventIds.includes(id))
        : [];

    console.log("eventsToRemove:", eventsToRemove);

    // Frissítsük a Performance rekordot
    const updatedPerformance = await prisma.performance.update({
      where: { id: performanceId },
      data: {
        ...performanceData,
        posterURL: posterURL[0],
        imagesURL: imageUrls,
        creators: {
          set: [],
          connect: creatorsIds.map((creator) => ({ id: creator.id })),
        },
        performanceEvents: {
          ...(Array.isArray(eventsToRemove) &&
            eventsToRemove.length > 0 && {
              disconnect: eventsToRemove.map((eventId) => ({ id: eventId })),
            }),
          ...(Array.isArray(performanceEventIds) &&
            performanceEventIds.filter((event) => event && event.id).length >
              0 && {
              connect: performanceEventIds
                .filter((event) => event && event.id) // 🚀 Kiszűrjük az undefined értékeket
                .map((performanceEvent) => ({
                  id: performanceEvent.id,
                })),
            }),
        },
      },
      include: {
        performanceEvents: true,
      },
    });

    return updatedPerformance;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to update performance",
      error.status || 500
    );
  }
};

const destroy = async (performanceId) => {
  try {
    const performanceToDelete = await getById(performanceId);

    // Kapcsolódó performanceEvents ID-k kinyerése
    const relatedEvents = await prisma.performanceEvents.findMany({
      where: { performanceId },
      select: { id: true },
    });

    const eventIds = relatedEvents.map((event) => event.id);

    // Performance események törlése
    if (eventIds.length > 0) {
      await performanceEventsService.destroyMany(eventIds);
    }

    // Fájlok törlése (plakát és képek)
    await deleteFiles([performanceToDelete.posterURL]);
    await deleteFiles(performanceToDelete.imagesURL);

    // Maga a performance törlése
    return prisma.performance.delete({ where: { id: performanceId } });
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to delete performance",
      error.status || 500
    );
  }
};

const deleteSingleImage = async (performanceId, imageUrl) => {
  try {
    const performanceToUpdate = await getById(performanceId);

    // eslint-disable-next-line prefer-const
    let { imagesURL, posterURL } = performanceToUpdate;

    // Ha az imagesURL null, akkor alakítsuk át üres tömbbé
    if (!imagesURL) {
      imagesURL = [];
    }

    if (!Array.isArray(imagesURL)) {
      throw new HttpError("Invalid imagesURL format in database", 500);
    }

    const imageUrls = Array.isArray(imageUrl) ? imageUrl : [imageUrl];

    console.log("performanceId: ", performanceId);
    console.log("originalImagesUrl: ", imagesURL);
    console.log("posterURL: ", posterURL);
    console.log("imageUrls: ", imageUrls);

    console.log("🛠️ DEBUG: performanceId type:", typeof performanceId);
    console.log("🛠️ DEBUG: performanceId value:", performanceId);

    // **Ha nincs még kép az adatbázisban, az új képeket hozzáadjuk**
    if (imagesURL.length === 0 && posterURL === null) {
      console.log("📌 No images found in database. Adding new images...");

      const updatedPerformance = await prisma.performance.update({
        where: { id: performanceId },
        data: { imagesURL: imageUrls }, // Az érkező képek hozzáadása
      });

      return updatedPerformance; // **Itt nem törlünk, csak hozzáadunk**
    }

    // Ellenőrizzük, hogy az adott képek léteznek-e az adatbázisban
    const isPoster = imageUrls.includes(posterURL);
    const isInImages = imageUrls.some((url) => imagesURL.includes(url));

    if (!isPoster && !isInImages) {
      throw new HttpError("Image URL not found in performance", 400);
    }

    // Cloudinary delete
    await deleteFiles(imageUrls);

    const updatedData = {};

    if (isPoster) {
      updatedData.posterURL = null;
    }

    if (isInImages) {
      updatedData.imagesURL = imagesURL.filter(
        (url) => !imageUrls.includes(url)
      );
    }

    // Updating db
    const updatedPerformance = await prisma.performance.update({
      where: { id: performanceId },
      data: updatedData,
    });

    return updatedPerformance;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to delete image",
      error.statusCode || 500
    );
  }
};

const addFollower = async (id, followerData) => {
  const performanceAddedFollower = await prisma.performance.update({
    where: { id }, // 🔹 Az azonosítás az id alapján történik
    data: {
      performanceFollowers: {
        connect: { id: followerData.userId }, // 🔹 Felhasználó hozzákapcsolása
      },
    },
  });
  return performanceAddedFollower;
};

const removeFollower = async (id, followerData) => {
  const performanceUnfollowed = await prisma.performance.update({
    where: { id }, // 🔹 Az azonosítás az előadás ID alapján történik
    data: {
      performanceFollowers: {
        disconnect: { id: followerData.userId }, // 🔹 Felhasználó eltávolítása a kapcsolatból
      },
    },
  });
  return performanceUnfollowed;
};

export default {
  create,
  update,
  destroy,
  list,
  listAll,
  isOwn,
  getByName,
  deleteSingleImage,
  getById,
  listAllGenres,
  addFollower,
  removeFollower,
};
