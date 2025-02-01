import userService from "../services/user.services.js";
import HttpError from "../utils/HttpError.js";

const listUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();
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
    else next(new HttpError("User is not Found", 404));
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

const newTheaterAdmin=async (req,res,next) =>{
    const {userId,theaterId}=req.body; 
    if(userId && theaterId) {
      try{
      const answer=await userService.setNewUserToTheaterAdmin(userId,theaterId);
      res.status(201).json({Message:answer});
      }catch(error){
        next(error);
      }
    }
    else next(new HttpError("TheaterAdmin data is incompleted", 403))
};

const deleteTheaterAdmin=async(req,res,next) =>{
  const { id } = req.params;
  console.log("törlenő Id",id)
  try{
    const answer= await userService.deleteUserFromTheaterAdmin(id);
    console.log(answer);
    if(answer)
       res.status(201).json({mesage:"TheaterAdmin is deleted"});
    else next(new HttpError("TheaterAdmin is not Found", 404)); 
  }
  catch(error){
    next(error);
  }
};

export default {
  listUsers,
  getUser,
  getOwnUser,
  updateUser,
  deleteUser,
  passwordChange,
  newTheaterAdmin,
  deleteTheaterAdmin,
};
