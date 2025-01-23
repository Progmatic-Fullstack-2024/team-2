import theatersService from "../services/theaters.service.js";

const getTheaterForDropdown = async (req, res, next) => {
  try {
    const theatersData = await theatersService.getTheaterIdName();
    return res.json(theatersData);
  } catch (error) {
    return next(error);
  }
};

export default {
  getTheaterForDropdown,
};
