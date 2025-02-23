import userService from "../services/user.service.js";
import HttpError from "../utils/HttpError.js";

const listUsers = async (req, res, next) => {
  const { orderBy, direction, page, search, field, filter } = req.query;
  let calcLimit;
  let numpage;
  if (page) {
    calcLimit = req.query.limit ? req.query.limit : 10;
    calcLimit = Number(calcLimit);
    if (Number.isNaN(calcLimit)) calcLimit = 10;
    numpage = Number(page);
    if (Number.isNaN(numpage)) {
      numpage = undefined;
      calcLimit = undefined;
    }
  }
  if (direction && direction !== "asc" && direction !== "desc")
    next(new HttpError("Bad value of direction!"), 401);
  try {
    const users = await userService.getAllUser(
      orderBy,
      direction,
      numpage,
      calcLimit,
      search,
      field,
      filter,
    );
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await userService.getUserById(id);
      if (!user) next(new HttpError("User is not Found", 404));
      else res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

const getOwnUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userService.getOwnUserById(id);
    if (!user) next(new HttpError("User is not Found", 404));
    else res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id, firstName, lastName, email, phone, birthDate } = req.body;
  let { role } = req.body;
  if (id) {
    if (req.user.role !== "admin" && id !== req.user.id) {
      next(new HttpError("Access denied: Admin can update users only", 403));
      return;
    }
    if (req.user.role !== "admin") role = undefined;
    try {
      const user = await userService.updateUser(
        id,
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        role,
      );
      if (user) res.status(201).json({ message: "Update is successful." });
      else next(new HttpError("User is not Found", 404));
    } catch (error) {
      next(error);
    }
  } else next(new HttpError("User is not Found", 404));
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const user = await userService.deleteUser(id);
    if (user) res.status(201).json({ message: "User deleted" });
    else next(new HttpError("User is not Found or not deletable", 404));
  } else next(new HttpError("User id is required", 401));
};

const passwordChange = async (req, res, next) => {
  const { id, oldPassword, newPassword } = req.body;
  if (id && oldPassword && newPassword) {
    const answer = await userService.passwordChange(
      id,
      oldPassword,
      newPassword,
    );
    if (answer) res.status(201).json({ message: "Password is updated" });
    else next(new HttpError("Password is incorrect", 403));
  } else next(new HttpError("Data is incompleted", 403));
};

const countUsers = async (req, res) => {
  const { search, field, filter } = req.query;
  const userNumber = await userService.countUsers(search, field, filter);
  res.status(201).json({ numberOfUsers: userNumber });
};

const createNewPassword = async (req, res) => {
  const { email, lastname, firstname } = req.body;
  let outAnswer = "";
  if (email && lastname && firstname) {
    const answer = await userService.createNewPassword(
      email,
      lastname,
      firstname,
    );
    if (answer.accepted) outAnswer = ` mail send:${answer.accepted}`;
    else outAnswer = ` mail not sent error: ${answer}`;
    res.status(201).json({ result: outAnswer });
  } else res.status(400).json({ error: "parameter missing" });
};

export default {
  listUsers,
  getUser,
  getOwnUser,
  updateUser,
  deleteUser,
  passwordChange,
  countUsers,
  createNewPassword,
};
