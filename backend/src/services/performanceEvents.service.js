import prisma from "../models/prisma-client.js";

const list = async () => {
  const allPerformanceEvents = await prisma.performanceEvents.findMany();
  return allPerformanceEvents;
};

const getById = async (id) => {
  const performanceEventById = await prisma.performanceEvents.findUnique({
    where: { id },
  });
  return performanceEventById;
};

const create = async (performanceEventData) => {
  const newPerformanceEvent = await prisma.performanceEvents.create({
    data: {
      ...performanceEventData,
    },
  });
  return newPerformanceEvent;
};

const update = async (id, performanceEventData) => {
  const updatedPerformanceEvent = await prisma.performanceEvents.update({
    where: { id },
    data: {
      ...performanceEventData,
    },
  });
  return updatedPerformanceEvent;
};

const destroy = async (id) => {
  const performanceEventToDelete = await prisma.performanceEvents.delete({
    where: { id },
  });
  return performanceEventToDelete;
};

export default {
  list,
  getById,
  create,
  update,
  destroy,
};
