import bcrypt from "bcrypt";
import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";
import { getEmailExists } from "./auth.service.js";

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

    include: {
      theaterAdmin: true,
    },
  });
  return user;
};

const getOwnUserById = async (id) => {
  const user = await getUserById(id);
  if (!user) return null;
  if (user.role === "user") delete user.role;
  delete user.theaterAdmin;
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

const isTheaterAdmin = async (userId) => {
  const theater = await prisma.theaterAdmin.findMany({
    where: { userId },
  });
  return theater;
};

const deleteUserFromTheaterAdmin = async (userId) => {
  let theater=false;
  const isTheater=await isTheaterAdmin(userId);
  if(isTheater.length>0) {
        theater = await prisma.theaterAdmin.delete({
        where: { userId },
        });
  }
  return theater;
};

const setNewUserToTheaterAdmin = async (userId, theaterId) => {
  await deleteUserFromTheaterAdmin(userId);
  const theaterAdmin = await prisma.theaterAdmin.create({
    data: { userId, theaterId },
  });
  return theaterAdmin;
};

export default {
  getAllUser,
  getUserById,
  getOwnUserById,
  updateUser,
  deleteUser,
  passwordChange,
  setNewUserToTheaterAdmin,
  deleteUserFromTheaterAdmin,
};
