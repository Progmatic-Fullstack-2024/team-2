import prisma from "../models/prisma-client.js";

const listAllGenres = async () => {
  const genresWithCount = await prisma.genre.groupBy({
    by: ["name"], // Csoportosítás műfajnév szerint
    _count: {
      name: true, // Megszámolja, hányszor szerepel az adott műfaj
    },
  });

  return genresWithCount.map((g) => ({
    name: g.name,
    // eslint-disable-next-line no-underscore-dangle
    count: g._count.name,
  }));
};

export default {
  listAllGenres,
};
