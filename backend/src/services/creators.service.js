import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";
import { createFiles, deleteFiles, uploadSingleFile } from "./file.service.js";

const getCreatorsIdName = async () => {
  try {
    const creatorsData = await prisma.creator.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return creatorsData;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to load creators",
      error.status || 500,
    );
  }
};

const listAll = async () => {
  const allCreators = await prisma.creator.findMany();
  return allCreators;
};

const getById = async (id) => {
  const creatorById = await prisma.creator.findUnique({
    where: { id },
    include: {
      performances: {
        include: {
          theater: true,
          performanceEvents: true,
        },
      },
      company: true,
    },
  });
  return creatorById;
};

const create = async (creatorData, image) => {
  const imageURL = await createFiles([image]);
  const newCreator = await prisma.creator.create({
    data: {
      ...creatorData,
      imageURL: imageURL[0],
    },
  });
  return newCreator;
};

const update = async (id, creatorData, image) => {
  const creatorToUpdate = await prisma.creator.findUnique({
    where: { id },
  });

  if (!creatorToUpdate) {
    throw new Error("Creator not found");
  }

  let imageUrl = creatorToUpdate.imageURL;

  if (image) {
    if (imageUrl) {
      await deleteFiles([imageUrl]);
    }

    const newImageUrl = await uploadSingleFile(image);

    imageUrl = newImageUrl;
  }

  const filteredData = Object.fromEntries(
    Object.entries(creatorData).filter(([value]) => value !== undefined),
  );

  // A profession mező biztosan tömb legyen
  if (filteredData.profession) {
    filteredData.profession = Array.isArray(filteredData.profession)
      ? filteredData.profession
      : [filteredData.profession];
  }

  const updatedCreator = await prisma.creator.update({
    where: { id },
    data: {
      ...filteredData,
      imageURL: imageUrl,
    },
  });

  return updatedCreator;
};

const destroy = async (id) => {
  const creatorToDelete = await prisma.creator.delete({
    where: { id },
  });

  await deleteFiles([creatorToDelete.imageURL]);

  return creatorToDelete;
};

export default {
  getCreatorsIdName,
  listAll,
  getById,
  create,
  update,
  destroy,
};
