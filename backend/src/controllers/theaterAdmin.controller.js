import theaterAdminService from "../services/theaterAdmin.service.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
  const { userId, theaterId } = req.body;
  if (userId && theaterId) {
    try {
      const answer = await theaterAdminService.setNewUserToTheaterAdmin(
        userId,
        theaterId
      );
      res.status(201).json({ Message: answer });
    } catch (error) {
      next(error);
    }
  } else next(new HttpError("TheaterAdmin data is incompleted", 403));
};

const deleteTheaterAdmin = async (req, res, next) => {
  const { id } = req.params;
  console.log("törlenő Id", id);
  try {
    const answer = await theaterAdminService.deleteUserFromTheaterAdmin(id);
    console.log(answer);
    if (answer) res.status(201).json({ mesage: "TheaterAdmin is deleted" });
    else next(new HttpError("TheaterAdmin is not Found", 404));
  } catch (error) {
    next(error);
  }
};

const getByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const theaterAdminByUserId = await theaterAdminService.getByUserId(userId);
    res.status(200).json(theaterAdminByUserId);
  } catch (error) {
    next(error);
  }
};

export default { create, deleteTheaterAdmin, getByUserId };
