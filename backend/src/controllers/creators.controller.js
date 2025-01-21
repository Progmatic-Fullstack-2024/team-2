import creatorsService from "../services/creators.service.js";

const getCreatorsForDropdown = async (req, res, next) => {
  try {
    const creatorsData = await creatorsService.getCreatorsIdName();
    return res.json(creatorsData);
  } catch (error) {
    return next(error);
  }
};

export default {
  getCreatorsForDropdown,
};
