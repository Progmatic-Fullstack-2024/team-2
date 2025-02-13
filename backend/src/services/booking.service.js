import prisma from "../models/prisma-client.js";

const getByUserId = async ({ userId }) => {
  const response = await prisma.userSeasonTicket.findMany({
    where: { userId: userId },
    include: {
      SeasonTicket: true,
    },
  });
  return response;
};

export default { getByUserId };
