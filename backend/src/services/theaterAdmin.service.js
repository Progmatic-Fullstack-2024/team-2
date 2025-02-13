import prisma from "../models/prisma-client.js";

const isTheaterAdmin = async (userId) => {
  const theater = await prisma.theaterAdmin.findMany({
    where: { userId },
  });
  return theater;
};

const deleteUserFromTheaterAdmin = async (userId) => {
  let theater = false;
  const isTheater = await isTheaterAdmin(userId);
  if (isTheater.length > 0) {
    theater = await prisma.theaterAdmin.delete({
      where: { userId },
    });
  }
  return theater;
};

const setNewUserToTheaterAdmin = async (userId, theaterId) => {
  await deleteUserFromTheaterAdmin(userId);
  const theaterAdmin = await prisma.theaterAdmin.create({
    data: { userId, theaterId },
  });
  return theaterAdmin;
};

const getByUserId = async (userId) => {
  const theaterAdminByUserId = await prisma.theaterAdmin.findUnique({
    where: { userId },
    include: {
      theater: {
        include: {
          performances: {
            include: {
              performanceEvents: true,
            },
          },
        },
      },
    },
  });
  return theaterAdminByUserId;
};

export default {
  setNewUserToTheaterAdmin,
  deleteUserFromTheaterAdmin,
  getByUserId,
};
