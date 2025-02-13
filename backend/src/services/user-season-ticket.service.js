import prisma from "../models/prisma-client.js";

const list = async () => {
  const response = await prisma.userSeasonTicket.findMany();
  return response;
};

const getById = async ({ id }) => {
  const response = await prisma.userSeasonTicket.findUnique({ where: { id } });
  return response;
};

const create = async ({ userId, seasonTicketId }) => {
  const response = await prisma.userSeasonTicket.create({
    data: { userId, seasonTicketId },
  });
  return response;
};

const destroy = async ({ id }) => {
  const response = await prisma.userSeasonTicket.delete({
    where: { id },
  });
  return response;
};

export default { list, create, getById, destroy };
