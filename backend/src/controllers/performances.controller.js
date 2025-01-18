import performancesService from "../services/performances.service.js";
import HttpError from "../utils/HttpError.js";
import performanceValidationSchemaForCreate from "../validations/performanceValidation.js";

const listPerformances = async (req, res, next) => {
  try {
    const performances = await performancesService.list();
    res.status(200).send(performances);
  } catch (error) {
    next(error);
  }
};
const getPerformanceByID = async (req, res, next) => {
  try {
    const performance = await performancesService.getById();
    res.status(200).send(performance);
  } catch (error) {
    next(error);
  }
};

const createPerformance = async (req, res, next) => {
  const { title, theaterId, description, price, performanceDate, creatorsId } =
    req.body;

  const creatorsIds = Array.isArray(creatorsId)
    ? creatorsId.map((creatorId) => ({ id: creatorId }))
    : [];

  const poster = req.files.poster ? req.files.poster[0] : null;
  const images = req.files && req.files.files ? req.files.files : [];

  try {
    await performanceValidationSchemaForCreate.validate({
      title,
      theaterId,
      description,
      price,
      performanceDate,
    });

    const parsedPerformanceDate = [new Date(performanceDate)];
    const newPerformance = await performancesService.create(
      {
        title,
        theaterId,
        description,
        performanceDate: parsedPerformanceDate,
        price: Number(price),
      },
      poster,
      images,
      creatorsIds,
    );
    res.status(201).json(newPerformance);
  } catch (error) {
    next(
      new HttpError(
        error.message || "Failed to create performance",
        error.statusCode || 500,
      ),
    );
  }
};

const updatePerformance = async (req, res, next) => {
  const { performanceId } = req.params;
  const { title, theater, description, price, performanceDate, creatorsId } =
    req.body;

  const updateData = {};
  if (title) updateData.title = title;
  if (theater) updateData.theater = theater;
  if (description) updateData.description = description;
  if (price) updateData.price = Number(price);
  if (performanceDate) {
    const parsedDate = new Date(performanceDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return next(new HttpError("Invalid performanceDate format", 400));
    }
    updateData.performanceDate = [parsedDate];
  }

  const creatorsIds = Array.isArray(creatorsId)
    ? creatorsId.map((creatorId) => ({ id: creatorId }))
    : [];

  const poster = req.files.poster ? req.files.poster[0] : null;
  const images = req.files && req.files.files ? req.files.files : [];

  try {
    const updatedPerformance = await performancesService.update(
      performanceId,
      updateData,
      poster,
      images,
      creatorsIds,
    );
    return res.status(200).json({ updatedPerformance });
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to update performance",
        error.statusCode || 500,
      ),
    );
  }
};

const destroyPerformance = async (req, res, next) => {
  const { performanceId } = req.params;
  try {
    const deletedPerformance = await performancesService.destroy(performanceId);
    res.status(200).json({ deletedPerformance });
  } catch (error) {
    next(
      new HttpError(
        error.message || "Failed to delete performance",
        error.statusCode || 500,
      ),
    );
  }
};

export default {
  createPerformance,
  updatePerformance,
  destroyPerformance,
  listPerformances,
  getPerformanceByID,
};
