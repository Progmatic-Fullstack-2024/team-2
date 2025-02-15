import prisma from "../models/prisma-client.js";

const list = async () => {
  const response = await prisma.seasonTicket.findMany({
    orderBy: { price: "asc" },
  });
  console.log("response");
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
export default { list, create, getById };
