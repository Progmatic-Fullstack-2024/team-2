import prisma from "../models/prisma-client.js";

const list = async () => {
  const response = await prisma.seasonTicket.findMany();
  return response;
};

const create = async ({ name, price, durationDay, seatQuantity }) => {
  const response = await prisma.seasonTicket.create({
    data: { name, price, durationDay, seatQuantity },
  });
  return response;
};

const getById = async ({ id }) => {
  const response = await prisma.seasonTicket.findUnique({ where: { id } });
  return response;
};

const getByUserId = async ({ userId }) => {
  const response = await prisma.userSeasonTicket.findMany({
    where: { userId: userId },
    include: {
      SeasonTicket: true,  
    },
  });
  return response;
};

export default { list, create, getById, getByUserId };
