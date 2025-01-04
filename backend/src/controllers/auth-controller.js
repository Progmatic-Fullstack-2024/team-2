import authService from "../services/auth-service.js";
import { userValidationSchemaForLogin } from "../validations/userValidationSchema.js";

async function registration(req, res) {
  const { firstName, lastName, email, password, phone } = req.body;
  if (firstName && lastName && email && password) {
    const newUser = await authService.userCreate(
      lastName,
      firstName,
      email,
      password,
      phone,
    );
    if (newUser) {
      res.status(201).send("user recorded succesfully");
      console.log(newUser);
    } else res.status(500).send("server error");
  } else {
    res.status(401).send("Data is incomplete");
  }
}

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
