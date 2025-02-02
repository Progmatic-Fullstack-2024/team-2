import seasonTicketsService from "../services/season-tickets.service.js";
import HttpError from "../utils/HttpError.js";

const list = (req, res, next) => {
	try {
		const response = seasonTicketsService.list();
		res.json(response);
	} catch (error) {
		next(error);
	}
};

const create = (req, res, next) => {
	const { name, price, durationDay, seatQuantity } = req.body;
	if (Object.values({ name, price, durationDay, seatQuantity }).includes(undefined || null))
		throw HttpError("Invalid season ticket data!", 418);
	try {
		const response = seasonTicketsService.create({ name, price, durationDay, seatQuantity });
		res.json(response);
	} catch (error) {
		next(error);
	}
};
export default { list, create };
