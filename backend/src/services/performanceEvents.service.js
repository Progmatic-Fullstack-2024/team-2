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

const destroyMany = async (eventIds) => {
  try {
    if (!eventIds || eventIds.length === 0) {
      return { message: "No performance events to delete." };
    }

    const deletedEvents = await prisma.performanceEvents.deleteMany({
      where: {
        id: { in: eventIds },
      },
    });

    return {
      message: "Performance events deleted successfully",
      deletedCount: deletedEvents.count,
    };
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to delete performance events",
      error.status || 500,
    );
  }
};

export default {
  list,
  getById,
  create,
  update,
  destroy,
  destroyMany,
};
