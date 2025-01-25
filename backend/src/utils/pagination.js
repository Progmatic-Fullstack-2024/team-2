export default function paginate(query, defaultLimit = 12, defaultPage = 1) {
  const {
    page = defaultPage,
    limit = defaultLimit,
    // date,
    price,
    orderBy,
    sort,
  } = query;
  // let newShit = date.split(",");
  // newShit = newShit.map((item) => {
  // 	return {
  // 		performanceDate: { gte: new Date(item), lte: new Date(item + "-12-31") },
  // 	};
  // });
  // console.log("newShit   ", newShit);
  const pagination = {
    skip: (page - 1) * limit,
    take: Number(limit),

    where: {
      // OR: date && newShit,

      price: price && { lte: Number(price) },
    },
  };

  if (orderBy) pagination.orderBy = { [orderBy]: sort || "asc" };

  return pagination;
}
