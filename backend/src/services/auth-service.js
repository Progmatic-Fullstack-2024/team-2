import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../constants/constants.js";
import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new HttpError("Invalid email or password", 403);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new HttpError("Invalid email or password", 403);

  const payload = {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};

export default { login };
