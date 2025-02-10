import userSeasonTicketService from "../services/user-season-ticket.service";

const list = async (req, res, next) => {
	try {
		const response = awaituserSeasonTicket.findMany();
		res.json(response);
	} catch (error) {
		next(error);
	}
};

const getById = async (req, res, next) => {
	const { id } = req.body;
	try {
		const response = await userSeasonTicketService.findUnique({ where: { id } });
		res.json(response);
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	const { userId, seasonTicketId } = req.body;
	try {
		const response = await userSeasonTicketService.create({
			data: { userId, seasonTicketId },
		});
		res.json(response);
	} catch (error) {
		next(error);
	}
};

const destroy = async (req, res, next) => {
	const { id } = req.body;
	try {
		const response = await userSeasonTicketService.delete({
			where: { id },
		});
		res.json(response);
	} catch (error) {
		next(error);
	}
};

export default { list, create, getById, destroy };
