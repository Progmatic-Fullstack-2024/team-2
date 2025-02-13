import bcrypt from "bcrypt";
import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";
import theaterAdmin from "./theaterAdmin.service.js";
import { getEmailExists } from "./auth.service.js";

const createFilterObject = (search, field, filter) => {
  const searchFilter = { OR: "" };
  let rolefilter;
  if (search && field) {
    const fields = field.split(",");
    const find = [];
    fields.forEach((item) =>
      find.push({ [item]: { contains: `${search}`, mode: "insensitive" } }),
    );
    searchFilter.OR = find;
  }
  if (filter) {
    rolefilter = { role: filter };
  }
  let answer;
  if (search && field && filter) {
    answer = { AND: [searchFilter, rolefilter] };
  } else answer = rolefilter || searchFilter;
  return answer;
};

const getExperiedDate = (datetxt, durationDay) => {
  const durationms = Number(durationDay) * 86400000;
  let answer;
  const date = new Date(datetxt);
  if (Number.isNaN(durationms)) answer = date.getDate();
  else answer = date.getTime() + durationms;
  return answer;
};

const deleteOldUserSeasonTickets = (user) => {
  if (user.UserSeasonTicket && user.UserSeasonTicket.length > 0) {
    for (let i = 0; i < user.UserSeasonTicket.length; i += 1) {
      const endDate = getExperiedDate(
        user.UserSeasonTicket[i].created,
        user.UserSeasonTicket[i].SeasonTicket.durationDay,
      );
      if (endDate < Date.now()) user.UserSeasonTicket.splice(i, 1);
    }
  }
};

const deleteOldUserVisitedPerformance = (user) => {
  if (user.UserVisitedPerformance && user.UserVisitedPerformance.length > 0) {
    for (let i = 0; i < user.UserVisitedPerformance.length; i += 1) {
      if (
        user.UserVisitedPerformance[
          i
        ].performanceEvents.performanceDate.getTime() < Date.now()
      )
        user.UserVisitedPerformance.splice(i, 1);
    }
  }
};

const getAllUser = async (
  orderBy,
  direction,
  page,
  limit,
  search,
  field,
  filter,
) => {
  let startNumber = 0;
  let short;
  let filtering;
  if ((search && field) || filter)
    filtering = createFilterObject(search, field, filter);
  if (page && limit) startNumber = (page - 1) * limit;
  if (orderBy && orderBy === "name") {
    short = [{ lastName: direction }, { firstName: direction }];
  } else if (orderBy && orderBy === "email") {
    short = { email: direction };
  }
  const users = await prisma.user.findMany({
    where: filtering,
    select: {
      id: true,
      lastName: true,
      firstName: true,
      email: true,
      phone: true,
      birthDate: true,
      role: true,
    },
    orderBy: short,
    skip: startNumber,
    take: limit,
  });
  return users;
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },

    include: {
      theaterAdmin: true,
      UserSeasonTicket: {
        include: {
          SeasonTicket: {
            select: {
              name: true,
              durationDay: true,
              seatQuantity: true,
            },
          },
        },
      },
      UserVisitedPerformance: {
        include: {
          performanceEvents: {
            include: {
              performance: {
                include: {
                  theater: {
                    select: { name: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  if (user) {
    deleteOldUserVisitedPerformance(user);
    delete user.password;
    for (let i = 0; i < user.UserVisitedPerformance.length; i += 1) {
      // it need'nt from prisma 4.x
      delete user.UserVisitedPerformance[i].performanceEvents.performance.id;
      delete user.UserVisitedPerformance[i].performanceEvents.performance
        .description;
      delete user.UserVisitedPerformance[i].performanceEvents.performance
        .posterURL;
      delete user.UserVisitedPerformance[i].performanceEvents.performance
        .imagesURL;
      delete user.UserVisitedPerformance[i].performanceEvents.performance
        .targetAudience;
      delete user.UserVisitedPerformance[i].performanceEvents.qrImage;
      delete user.UserVisitedPerformance[i].performanceEvents.userId;
    }
    deleteOldUserSeasonTickets(user);
  }
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
    if (user.theaterAdmin != null)
      await theaterAdmin.deleteUserFromTheaterAdmin(id);
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

const countUsers = async (search, field, filter) => {
  let filtering;
  if ((search && field) || filter)
    filtering = createFilterObject(search, field, filter);
  const userNumber = await prisma.user.count({
    where: filtering,
  });
  return userNumber;
};

export default {
  getAllUser,
  getUserById,
  getOwnUserById,
  updateUser,
  deleteUser,
  passwordChange,
  countUsers,
};
