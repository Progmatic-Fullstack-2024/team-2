export default function paginate(query, defaultLimit = 12, defaultPage = 1) {
  const {
    page = defaultPage,
    limit = defaultLimit,

    price,
    orderBy,
    sort,
  } = query;
  const pagination = {
    skip: (page - 1) * limit,
    take: Number(limit),

    where: {
      price: price && { lte: Number(price) },
    },
  };

  if (orderBy) pagination.orderBy = { [orderBy]: sort || "asc" };

  return pagination;
}
