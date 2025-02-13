import userSeasonTicketService from "../services/user-season-ticket.service.js";

const list = async (req, res, next) => {
  try {
    const response = await userSeasonTicketService.findMany();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await userSeasonTicketService.findUnique({
      where: { id },
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId, seasonTicketId } = req.body.data;
  try {
    const response = await userSeasonTicketService.create({
      userId,
      seasonTicketId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await userSeasonTicketService.delete({
      where: { id },
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export default { list, create, getById, destroy };
