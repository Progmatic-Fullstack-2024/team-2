export function paginate(query, defaultLimit = 10, defaultPage = 1) {
	const { page = defaultPage, limit = defaultLimit, filter, orderBy, sort } = query;

	const pagination = {
		skip: (page - 1) * limit,
		take: parseInt(limit),
	};

	if (filter)
		pagination.where = {
			[filter[0]]: { contains: filter[1], mode: "insensitive" },
		};

	if (orderBy) pagination.orderBy = { [orderBy]: sort || "asc" };

	return pagination;
}
