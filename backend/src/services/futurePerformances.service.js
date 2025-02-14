import prisma from "../models/prisma-client.js";

const list = async () => {
  const allFuturePerformances = await prisma.futurePerformances.findMany();
  return allFuturePerformances;
};

const getById = async (id) => {
  const futurePerformanceById = await prisma.futurePerformances.findUnique({
    where: { id },
  });
  return futurePerformanceById;
};

const create = async (futurePerformanceData) => {
  const newFuturePerformance = await prisma.futurePerformances.create({
    data: {
      ...futurePerformanceData,
    },
  });
  return newFuturePerformance;
};

const update = async (id, futurePerformanceData) => {
  const futurePerformanceToUpdate = await prisma.futurePerformances.update({
    where: { id },
    data: {
      ...futurePerformanceData,
    },
  });
  return futurePerformanceToUpdate;
};

const destroy = async (id) => {
  const futurePerformanceToDelete = await prisma.futurePerformances.delete({
    where: { id },
  });
  return futurePerformanceToDelete;
};

export default {
  list,
  getById,
  create,
  update,
  destroy,
};
