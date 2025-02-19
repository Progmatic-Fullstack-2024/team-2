import bcrypt from "bcrypt";
import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";
import theaterAdmin from "./theaterAdmin.service.js";
import sendmail from "../utils/Mailing.service.js";
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

const generatePassword = () => {
  const letter =
    "qwertzuiopasdfghjklyxcvbnm#&1234567890QWERTZUIOPASDFGHJKLYXCVBNM";
  let password = "";
  for (let i = 0; i < 6; i += 1) {
    const number = Math.round(Math.random() * letter.length);
    password += letter[number];
  }
  return password;
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
    include: {
      theaterAdmin: {
        include: { theater: { select: { name: true } } },
      },
    },
    orderBy: short,
    skip: startNumber,
    take: limit,
  });
  if (users)
    users.forEach((user) => {
      const newUser = user;
      delete newUser.password;
      return newUser;
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
      // it need because I can not use select
      delete user.UserVisitedPerformance[i].performanceEvents.performance.id;
      delete user.UserVisitedPerformance[i].performanceEvents.performance
        .description;
      delete user.UserVisitedPerformance[i].performanceEvents.performance
        .posterURL;
      delete user.UserVisitedPerformance[i].performanceEvents.performance
        .imagesURL;
      delete user.UserVisitedPerformance[i].performanceEvents.performance
        .targetAudience;
      delete user.UserVisitedPerformance[i].performanceEvents.userId;
    }
    deleteOldUserSeasonTickets(user);
  }
  return user;
};

const getUserByIdWithIncudes = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },

    include: {
      theaterAdmin: true,
      UserSeasonTicket: true,
      UserVisitedPerformance:true,
      followedPerformance:true,
      followedTheater:true,
      userSettings:true,
    },
  });
  if (user) delete user.password;
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

const deleteUserSettingByUserId=async(userId)=> {
  const thema=await prisma.userSetting.delete({
    where:{userId}
  });
}

const deleteUser = async (id) => {
  let user = await getUserByIdWithIncudes(id);
  if (user && user.UserSeasonTicket.length === 0 && user.UserVisitedPerformance.length===0) {
    if (user.theaterAdmin != null)
      await theaterAdmin.deleteUserFromTheaterAdmin(id);
    if(user.userSettings) deleteUserSettingByUserId(id);
    user = await prisma.user.delete({
      where: { id },
    });
  }
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

const createNewPassword = async (email, lastname, firstname) => {
  let answer = "Mail not sent";
  const user = await prisma.user.findUnique({ where: { email } });
  if (lastname === user.lastName && firstname === user.firstName) {
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 5);
    const subject = "Új jelszó megküldése";
    const text = `Kedves ${lastname} ${firstname}! 

    Az új jelszava a következő: ${password}
    Ha nem ön kérte a jelszóváltoztatást kérem haladéktalanul jeleze!
    
    Üdvözlettel
    Theatron csapata`;
    answer = await sendmail(email, subject, text);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  } else answer = "Bad data, query refused";
  return answer;
};

export default {
  getAllUser,
  getUserById,
  getOwnUserById,
  updateUser,
  deleteUser,
  passwordChange,
  countUsers,
  createNewPassword,
};
