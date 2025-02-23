import prisma from "../models/prisma-client.js";
import { createFiles, deleteFiles, updateFiles } from "./file.service.js";
import HttpError from "../utils/HttpError.js";
import performanceEventsService from "./performanceEvents.service.js";

function converDate(date) {
  return new Date(date).toLocaleTimeString("hun", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
      performanceEvents: true,
      theater: true,
      genre: !!filter.genre,
      creators: !!filter.creators,
    },

    orderBy:
      Object.keys(orderBy)[0] === "performanceDate" ? undefined : orderBy,
  });
  if (!performances) throw new HttpError("Performances not found", 404);

  // unpack EVENTS
  const expandedPerformances = [];
  performances.forEach((perf) => {
    if (!perf.performanceEvents.length) {
      expandedPerformances.push(perf);
    } else {
      perf.performanceEvents.forEach((event) => {
        const newPerf = { ...perf };
        newPerf.performanceEvents = [event];
        expandedPerformances.push(newPerf);
      });
    }
  });

  // sort by DATE
  if ("performanceDate" in orderBy) {
    if (orderBy.performanceDate === "asc") {
      expandedPerformances.sort((a, b) => {
        if (a.performanceEvents.length && b.performanceEvents.length) {
          return (
            a.performanceEvents[0].performanceDate -
            b.performanceEvents[0].performanceDate
          );
        }
        return null;
      });
    } else if (orderBy.performanceDate === "desc") {
      expandedPerformances.sort((a, b) => {
        if (a.performanceEvents.length && b.performanceEvents.length) {
          return (
            b.performanceEvents[0].performanceDate -
            a.performanceEvents[0].performanceDate
          );
        }
        return null;
      });
    }
  }

  // apply custom SKIP and TAKE
  let filteredPerformances = expandedPerformances.filter(
    (item, index) => index >= filter.skip && index < filter.skip + filter.take,
  );

  // convert dates in array
  filteredPerformances = filteredPerformances.map((perf) => {
    const newPerf = perf;
    if (newPerf.performanceEvents[0])
      newPerf.performanceEvents[0].performanceDate = converDate(
        newPerf.performanceEvents[0].performanceDate,
      );
    return newPerf;
  });

  return { data: filteredPerformances, maxSize: expandedPerformances.length };
};

const listAll = async () => {
  let allPerformances = await prisma.performance.findMany({
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
    },
  });

  // convert dates in array
  allPerformances = allPerformances.map((perf) => {
    const newPerf = perf;
    if (newPerf.performanceEvents[0])
      newPerf.performanceEvents[0].performanceDate = converDate(
        newPerf.performanceEvents[0].performanceDate,
      );
    return newPerf;
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
      error.status || 500,
    );
  }
};

const update = async (
  performanceId,
  performanceData,
  poster,
  images,
  creatorsIds,
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
      },
    });
    return updatedPerformance;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to update performance",
      error.status || 500,
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
      error.status || 500,
    );
  }
};

const deleteSingleImage = async (performanceId, imageUrl) => {
  try {
    const performanceToUpdate = await getById(performanceId);
    const { imagesURL, posterURL } = performanceToUpdate;

    const imageUrls = Array.isArray(imageUrl) ? imageUrl : [imageUrl];

    console.log("performanceId: ", performanceId);
    console.log("originalImagesUrl: ", imagesURL);
    console.log("posterURL: ", posterURL);
    console.log("imageUrls: ", imageUrls);

    // Check iamgeUrl is posterUrl or imageUrl
    const isPoster = imageUrls.includes(posterURL);
    const isInImages = imageUrls.some((url) => imagesURL.includes(url));

    if (!isPoster && !isInImages) {
      throw new HttpError("Image URL not found in performance", 400);
    }

    // Cloudinary delete
    await deleteFiles(imageUrls);

    const updatedData = {};

    // if posterUrl - delete
    if (isPoster) {
      updatedData.posterURL = null;
    }

    // if imageUrl - array - delete
    if (isInImages) {
      updatedData.imagesURL = imagesURL.filter(
        (url) => !imageUrls.includes(url),
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
      error.statusCode || 500,
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
