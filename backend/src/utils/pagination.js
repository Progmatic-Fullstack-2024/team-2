export default function paginate(query, defaultLimit = 12, defaultPage = 1) {
  const {
    page = defaultPage ,
    limit = defaultLimit ,

    price,
    orderBy,
    sort,
    //genre
    //groupByGenre {genre: [performance] } true/null
    //theater
    //groupByTheater {theater: [theaterId, theaterName] } true/null
    //creator
    //date
    //endDate
    //targetAudience
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
