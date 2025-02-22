import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../models/prisma-client.js";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

export const getEmailExists = async (email) => {
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
  birthDate,
}) => {
  const emailExists = await getEmailExists(email);
  if (emailExists) throw new HttpError("Email already exists!", 403);
  let birthDatedate;
  if (birthDate) birthDatedate = new Date(birthDate);
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = await prisma.user.create({
    data: {
      lastName,
      firstName,
      email,
      password: hashedPassword,
      phone,
      role,
      birthDate: birthDatedate,
    },
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
    birthDate: user.birthDate,
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
      birthDate: true,
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
      birthDate: true,
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
  birthDate,
  role,
  password,
) => {
  let hashedPassword;
  let birthDate1;
  if (password) hashedPassword = await bcrypt.hash(password, 5);
  if (email) {
    const existEmail = await getEmailExists(email);
    if (existEmail && existEmail.id !== id)
      throw new HttpError("Email already exists!", 403);
  }
  if (birthDate) {
    birthDate1 = new Date(birthDate);
  }
  const user = await prisma.user.update({
    where: { id },
    data: {
      firstName,
      lastName,
      email,
      phone,
      birthDate: birthDate1,
      role,
      password: hashedPassword,
    },
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

const passwordChange = async (id, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { password: true },
  });
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (isPasswordValid) {
    const hashedPassword = await bcrypt.hash(newPassword, 5);
    const answer = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    return answer;
  }
  return null;
};

export default {
  registration,
  login,
  getAllUser,
  getUserById,
  getOwnUserById,
  updateUser,
  deleteUser,
  passwordChange,
};
