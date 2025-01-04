import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../models/prisma-client.js";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

const registration = async ({
  lastName,
  firstName,
  email,
  password,
  phone,
  role = "user",
}) => {
  const emailExists = await prisma.user.findUnique({ where: { email } });
  if (emailExists) throw new HttpError("Email already exists!", 403);

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = await prisma.user.create({
    data: { lastName, firstName, email, password: hashedPassword, phone, role },
  });

  return newUser;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new HttpError("Invalid email or password", 403);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new HttpError("Invalid email or password", 403);

  const payload = {
    id: user.id,
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};

export default { registration, login };
