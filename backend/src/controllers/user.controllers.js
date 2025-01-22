import authService from "../services/auth.service.js";
import HttpError from "../utils/HttpError.js";

const listUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUser();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await authService.getUserById(id);
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
    const user = await authService.getOwnUserById(id);
    if (!user) next(new HttpError("User is not Found", 404));
    else res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id, firstName, lastName, email, phone } = req.body;
  let { role } = req.body;
  if (id) {
    if (req.user.role !== "Admin" && id !== req.user.id) {
      next(new HttpError("Access denied: Admin can update users only", 403));
      return;
    }
    if (req.user.role !== "Admin") role = undefined;
    try {
      const user = await authService.updateUser(
        id,
        firstName,
        lastName,
        email,
        phone,
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
    const user = await authService.deleteUser(id);
    if (user) res.status(201).json({ message: "User deleted" });
    else next(new HttpError("User is not Found", 404));
  } else next(new HttpError("User id is required", 401));
};

const passwordChange = async (req, res, next) => {
  const { id, oldPassword, newPassword } = req.body;
  if (id && oldPassword && newPassword) {
    const answer = await authService.passwordChange(
      id,
      oldPassword,
      newPassword,
    );
    if (answer) res.status(201).json({ message: "Password is updated" });
    else next(new HttpError("Password is incorrect", 403));
  } else next(new HttpError("Data is incompleted", 403));
};

export default {
  listUsers,
  getUser,
  getOwnUser,
  updateUser,
  deleteUser,
  passwordChange,
};
