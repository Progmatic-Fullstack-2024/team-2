import prisma from "../models/prisma-client.js";
import { createFiles, deleteFiles, updateFiles } from "./file.service.js";
import HttpError from "../utils/HttpError.js";

const getById = async (performanceId) => {
  const performance = await prisma.performance.findUnique({
    where: { id: performanceId },
    include: {
      performanceEvents: true,
      creators: true,
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

const list = async ({ filter, search }) => {
  const { orderBy, where } = filter;

  const performances = await prisma.performance.findMany({
    where: {
      ...where,
      title: { contains: search, mode: "insensitive" },
    },
    include: {
      performanceEvents: true,
      genre: !!filter.genre,
      creators: !!filter.creators,
    },
    orderBy,
  });
  if (!performances) throw new HttpError("Performances not found", 404);
  // custom skip and take
  // console.log(performances);
  const filteredPerformances = performances.filter(
    (item, index) => index >= filter.skip && index < filter.skip + filter.take
  );

  return { data: filteredPerformances, maxSize: performances.length };
};

// const listAll = async () => {
//   const allPerformances = await prisma.performance.findMany();
//   return allPerformances;
// };

const listAll = async () => {
  const allPerformances = await prisma.performance.findMany({
    include: {
      performanceEvents: true,
      theater: {
        select: {
          id: true,
          name: true,
        },
      },
      genre: true,
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
  creatorsIds
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
      error.status || 500
    );
  }
};

const destroy = async (performanceId) => {
  try {
    const performanceToDelete = await getById(performanceId);
    await deleteFiles([performanceToDelete.posterURL]);
    await deleteFiles(performanceToDelete.imagesURL);
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

export default {
  create,
  update,
  destroy,
  list,
  listAll,
  getByName,
  deleteSingleImage,
  getById,
  listAllGenres,
};
