import genresService from "../services/genres.service.js";

const listAllGenres = async (req, res, next) => {
  try {
    const allGenres = await genresService.listAllGenres();
    res.status(200).send(allGenres);
  } catch (error) {
    next(error);
  }
};

export default {
  listAllGenres,
};
