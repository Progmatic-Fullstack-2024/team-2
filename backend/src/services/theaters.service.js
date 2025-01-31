import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";
import { uploadSingleFile, deleteFiles } from "./file.service.js";

const getTheaterIdName = async () => {
  try {
    const theatersData = await prisma.theater.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return theatersData;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to load theaters",
      error.status || 500,
    );
  }
};

const listAll = async () => {
  const allTheaters = await prisma.theater.findMany();
  return allTheaters;
};

const getById = async (id) => {
  const getTheaterById = await prisma.theater.findUnique({
    where: { id },
  });
  return getTheaterById;
};

const createTheater = async (theaterData, image) => {
  let imageURL = null;

  if (image) {
    imageURL = await uploadSingleFile(image);
  }

  const newTheater = await prisma.theater.create({
    data: {
      ...theaterData,
      imageURL,
    },
  });

  return newTheater;
};

const update = async (theaterId, theaterData, image) => {
  const theaterToUpdate = await getById(theaterId); // Meglévő adatok betöltése

  let imageUrl = theaterToUpdate.imageURL; // Megtartjuk a régi képet
  if (image) {
    const newImageUrl = await uploadSingleFile(image);
    imageUrl = newImageUrl;
  }

  // Eltávolítjuk az `undefined` értékeket
  const filteredData = Object.fromEntries(
    Object.entries(theaterData).filter(([value]) => value !== undefined),
  );

  const updatedTheater = await prisma.theater.update({
    where: { id: theaterId },
    data: {
      ...filteredData, // Csak a ténylegesen küldött adatokat frissítjük
      imageURL: imageUrl, // Ha nincs új kép, megtartjuk a régit
    },
  });

  return updatedTheater;
};

const destroy = async (theaterId) => {
  const theaterToDelete = await getById(theaterId);
  await deleteFiles(theaterToDelete.imagesURL);
  return prisma.theater.delete({ where: { id: theaterId } });
};

const deleteSingleImage = async (theaterId, imageUrl) => {
  const theaterToUpdate = await getById(theaterId);
  const originalImagesUrl = theaterToUpdate.imagesURL;
  if (!originalImagesUrl.includes[0]) {
    throw new HttpError("Image URL not found in theater", 400);
  }
  await deleteFiles(imageUrl);
  const updatedImagesUrl = originalImagesUrl.filter(
    (url) => url !== imageUrl[0],
  );

  const updatedTheater = await prisma.theater.update({
    where: { id: theaterId },
    data: { imagesURL: updatedImagesUrl },
  });
  return updatedTheater;
};

export default {
  getTheaterIdName,
  listAll,
  getById,
  createTheater,
  update,
  destroy,
  deleteSingleImage,
};
