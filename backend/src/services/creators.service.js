import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";

const getCreatorsIdName = async () => {
  try {
    const creatorsData = await prisma.creator.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return creatorsData;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to load creators",
      error.status || 500
    );
  }
};

export default { getCreatorsIdName };
