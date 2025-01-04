import registrationService from "../services/registration.service.js";

const create = async (req, res, next) => {
	const { lastName, firstName, email, password, phone, role } = req.body;
	try {
		const newUser = await registrationService.create({
			lastName,
			firstName,
			email,
			password,
			phone,
			role,
		});
		res.status(200).json({ newUser });
	} catch (error) {
		next(error);
	}
};

export default { create };
