import creatorsService from "../services/creators.service.js";
import HttpError from "../utils/HttpError.js";

const getCreatorsForDropdown = async (req, res, next) => {
  try {
    const creatorsData = await creatorsService.getCreatorsIdName();
    return res.json(creatorsData);
  } catch (error) {
    return next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const allCreators = await creatorsService.listAll();
    res.status(200).json(allCreators);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const creatorById = await creatorsService.getById(id);
    res.status(200).json(creatorById);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, profession, awards, introductions } = req.body;

  const image = req.files.image ? req.files.image[0] : null;

  try {
    const newCreator = await creatorsService.create(
      {
        name,
        profession: Array.isArray(profession) ? profession : [profession],
        awards,
        introductions,
      },
      image
    );
    res.status(201).json(newCreator);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, profession, awards, introductions } = req.body;

  const image = req.files?.image ? req.files.image[0] : null;

  try {
    const updatedCreator = await creatorsService.update(
      id,
      {
        name,
        profession,
        awards: awards || "", // Ha nem küldik, üres string marad
        introductions: introductions || "",
      },
      image
    );

    res.status(200).json(updatedCreator);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCreator = await creatorsService.destroy(id);
    res.status(200).json({ deletedCreator });
  } catch (error) {
    next(error);
  }
};

export default {
  getCreatorsForDropdown,
  list,
  getById,
  create,
  destroy,
  update,
};
