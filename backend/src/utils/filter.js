// genre   genre servizen lekérés addott zsnrét a hozzátatoró performancokkal -> performance service
//creator
//date
//endDate
//targetAudience

export default function filter(query) {
	let { page, limit, orderBy, sort, genre, theater, startDate, endDate, creators, targetAudience } =
		query;

	page = page || 1;
	limit = limit || 12;
	genre = genre && genre.split(",");
	creators = creators && creators.split(",");

	// create AND options
	const andFilters = [
		startDate && {
			performanceEvents: { some: { performanceDate: { gte: new Date(startDate) } } },
		},
		endDate && { performanceEvents: { some: { performanceDate: { lte: new Date(endDate) } } } },
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

	console.log("filter  :  ", filter);
	return filter;
}
