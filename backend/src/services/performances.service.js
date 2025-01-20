import prisma from "../models/prisma-client.js";
import { createFiles, deleteFiles, updateFiles } from "./file.service.js";
import HttpError from "../utils/HttpError.js";

const getById = async (performanceId) => {
  const performance = await prisma.performance.findUnique({
    where: { id: performanceId },
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

const list = async ({ title }) => {
  const performances = await prisma.performance.findMany({
    where: { title: { contains: title, mode: "insensitive" } },
  });
  if (!performances) throw new HttpError("Performances not found", 404);
  return performances;
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

    const { toAdd, toRemove } = creatorsIds;

    const updatedPerformance = await prisma.performance.update({
      where: { id: performanceId },
      data: {
        ...performanceData,
        posterURL: posterURL[0],
        imagesURL: imageUrls,
        creators: {
          connect: toAdd.map((creatorId) => ({ id: creatorId })),
          disconnect: toRemove.map((creatorId) => ({ id: creatorId })),
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
    await deleteFiles([performanceToDelete.posterURL]);
    await deleteFiles(performanceToDelete.imagesURL);
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
    const originalImagesUrl = performanceToUpdate.imagesURL;
    if (!originalImagesUrl.includes(imageUrl[0])) {
      throw new HttpError("Image URL not found in performance", 400);
    }
    await deleteFiles(imageUrl);
    const updatedImagesUrl = originalImagesUrl.filter(
      (url) => url !== imageUrl[0],
    );

    const updatedPerformance = await prisma.performance.update({
      where: { id: performanceId },
      data: { imagesURL: updatedImagesUrl },
    });
    return updatedPerformance;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to delete image",
      error.statusCode || 500,
    );
  }
};

export default {
  create,
  update,
  destroy,
  list,
  getByName,
  deleteSingleImage,
  getById,
};
