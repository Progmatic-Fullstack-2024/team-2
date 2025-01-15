import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../models/prisma-client.js";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

const getEmailExists = async (email) => {
  const emailExists = await prisma.user.findUnique({ where: { email } });
  return emailExists;
};

const registration = async ({
  lastName,
  firstName,
  email,
  password,
  phone,
  role = "user",
}) => {
  const emailExists = await getEmailExists(email);
  if (emailExists) throw new HttpError("Email already exists!", 403);

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = await prisma.user.create({
    data: { lastName, firstName, email, password: hashedPassword, phone, role },
  });

  return newUser;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new HttpError("Invalid email or password!", 403);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new HttpError("Invalid email or password!", 403);

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

const getAllUser = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      lastName: true,
      firstName: true,
      email: true,
      phone: true,
      role: true,
    },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      lastName: true,
      firstName: true,
      email: true,
      phone: true,
      role: true,
    },
  });
  return user;
};

const getOwnUserById = async (id) => {
  const user = await getUserById(id);
  if (user.role === "user") delete user.role;
  return user;
};

const updateUser = async (
  id,
  firstName,
  lastName,
  email,
  phone,
  role,
  password,
) => {
  let hashedPassword;
  if (password) hashedPassword = await bcrypt.hash(password, 5);
  if (email) {
    const existEmail = await getEmailExists(email);
    if (existEmail && existEmail.id !== id)
      throw new HttpError("Email already exists!", 403);
  }
  const user = await prisma.user.update({
    where: { id },
    data: { firstName, lastName, email, phone, role, password: hashedPassword },
  });
  return user;
};

const deleteUser = async (id) => {
  let user = await getUserById(id);
  if (user)
    user = await prisma.user.delete({
      where: { id },
    });

  return user;
};

export default {
  registration,
  login,
  getAllUser,
  getUserById,
  getOwnUserById,
  updateUser,
  deleteUser,
};
