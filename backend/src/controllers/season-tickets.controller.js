import seasonTicketsService from "../services/season-tickets.service.js";
import HttpError from "../utils/HttpError.js";

const list = async (req, res, next) => {
  try {
    const response = await seasonTicketsService.list();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, price, durationDay, seatQuantity } = req.body;
  if (
    Object.values({ name, price, durationDay, seatQuantity }).includes(
      undefined || null,
    )
  )
    throw HttpError("Invalid season ticket data!", 418);
  try {
    const response = await seasonTicketsService.create({
      name,
      price,
      durationDay,
      seatQuantity,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await seasonTicketsService.getById({ id });
    res.json(response);
  } catch (error) {
    next(error);
  }
};



export default { list, create, getById };
