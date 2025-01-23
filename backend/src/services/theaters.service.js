import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";

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

export default { getTheaterIdName };
