import authService from "../services/auth.service.js";
import userValidationSchemaForLogin from "../validations/userValidationSchema.js";

const registration = async (req, res, next) => {
  const { firstName, lastName, email, password, phone, role, birthDate } =
    req.body;

  try {
    const newUser = await authService.registration({
      lastName,
      firstName,
      email,
      password,
      phone,
      role,
      birthDate,
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await userValidationSchemaForLogin.validate({ email, password });
    const token = await authService.login({ email, password });
    res.json(token);
  } catch (error) {
    next(error);
  }
};

export default { registration, login };
