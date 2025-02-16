export default function queryFilter(query) {
  const {
    page = 1,
    limit = 12,
    orderBy,
    sort,
    startDate,
    endDate,
    targetAudience,
    theater,
    futureOnly,
  } = query;
  let { genre, creators } = query;

  genre = genre && genre.split(",");
  creators = creators && creators.split(",");

  // create AND options
  const andFilters = [
    startDate && {
      performanceEvents: {
        some: { performanceDate: { gte: new Date(startDate) } },
      },
    },
    endDate && {
      performanceEvents: {
        some: { performanceDate: { lte: new Date(endDate) } },
      },
    },
    ...((genre && genre.map((name) => ({ genre: { some: { name } } }))) || []),
  ].filter((item) => item);

  // create WHERE for filter
  const filterWhere = {
    targetAudience,
    theaterId: theater,

    AND: andFilters,
    OR: creators && creators.map((name) => ({ creators: { some: { name } } })),
  };
  // remove empty elements
  Object.keys(filterWhere).forEach((key) => {
    if (!filterWhere[key]) delete filterWhere[key];
  });

  // create final filter
  const filter = {
    skip: (page - 1) * limit,
    take: Number(limit),
    where: filterWhere,
    orderBy: { [orderBy || "title"]: sort || "asc" },
  };

  // For filtering futurePerformances only
  if (futureOnly === "true") {
    andFilters.push({
      futurePerformance: { isNot: null },
    });
  }

  return filter;
}
