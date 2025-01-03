import authService from "../services/auth-service.js";
import { userValidationSchemaForLogin } from "../validations/userValidationSchema.js";

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

export default { login };
