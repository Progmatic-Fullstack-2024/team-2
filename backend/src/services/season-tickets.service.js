import prisma from "../models/prisma-client.js";

const list = async () => {
	const response = await prisma.seasonTicket.findMany();
	return response;
};

const create = async ({ name, price, durationDay, seatQuantity }) => {
	const response = await prisma.seasonTicket.create({
		data: { name, price, durationDay, seatQuantity },
	});
	return response;
};

export default { list, create };
