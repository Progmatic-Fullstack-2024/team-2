import prisma from "../models/prisma.client.js";

const create = async ({ lastName, firstName, email, password, phone, role }) => {
	const newUser = await prisma.user.create({
		data: { lastName, firstName, email, password, phone, role },
	});

	return newUser;
};
export default { create };
