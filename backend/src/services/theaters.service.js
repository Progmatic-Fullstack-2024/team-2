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
      error.status || 500
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
    include: {
      performances: true,
      admins: true,
      followers: true,
    },
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
    Object.entries(theaterData).filter(([value]) => value !== undefined)
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

  // 🔥 Ellenőrizd, hogy `imageURL` egy string, és alakítsd tömbbé!
  const imageUrls = theaterToDelete.imageURL ? [theaterToDelete.imageURL] : [];

  await deleteFiles(imageUrls);

  return prisma.theater.delete({ where: { id: theaterId } });
};

const deleteSingleImage = async (theaterId, imageUrl) => {
  const theaterToUpdate = await getById(theaterId);
  const originalImageUrl = theaterToUpdate.imageURL; // Ez most egyetlen string, nem tömb!

  if (!originalImageUrl) {
    throw new HttpError("No image found for this theater", 400);
  }

  if (originalImageUrl !== imageUrl) {
    throw new HttpError(
      "Provided image URL does not match the stored image",
      400
    );
  }

  // 🔥 Töröljük a képet Cloudinary-ról
  await deleteFiles([imageUrl]); // Cloudinary tömböt vár, ezért be kell csomagolni

  // 🔥 Frissítjük az adatbázist: töröljük az `imageURL` mezőt (null-ra állítjuk)
  const updatedTheater = await prisma.theater.update({
    where: { id: theaterId },
    data: { imageURL: null }, // Töröljük a képet az adatbázisból
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
