import performancesService from "../services/performances.service.js";
import HttpError from "../utils/HttpError.js";
import {
  performanceValidationSchemaForCreate,
  performanceValidationSchemaForUpdate,
} from "../validations/performanceValidation.js";

const listPerformances = async (req, res, next) => {
  const { title } = req.query;
  try {
    const performances = await performancesService.list({ title });
    res.status(200).send(performances);
  } catch (error) {
    next(error);
  }
};
const getPerformanceByID = async (req, res, next) => {
  const { performanceId } = req.params;
  try {
    const performance = await performancesService.getById(performanceId);
    res.status(200).send(performance);
  } catch (error) {
    next(error);
  }
};

function makeParsedPerformanceDates(performanceDate) {
  let parsedDates = Array.isArray(performanceDate)
    ? performanceDate.map((date) => new Date(date))
    : [new Date(performanceDate)];
  
  return parsedDates;
}

const createPerformance = async (req, res, next) => {
  const { title, theaterId, description, price, performanceDate, creatorsId } =
    req.body;

  const creatorsIds = Array.isArray(creatorsId)
    ? creatorsId.map((creatorId) => ({ id: creatorId }))
    : [];

  const poster = req.files.poster ? req.files.poster[0] : null;
  const images = req.files && req.files.files ? req.files.files : [];

  let parsedPerformanceDates = makeParsedPerformanceDates(performanceDate);

  try {
    await performanceValidationSchemaForCreate.validate({
      title,
      theaterId,
      description,
      price,
      performanceDate: parsedPerformanceDates,
      creatorsId,
    });

    const newPerformance = await performancesService.create(
      {
        title,
        theaterId,
        description,
        performanceDate: parsedPerformanceDates,
        price: Number(price),
      },
      poster,
      images,
      creatorsIds
    );
    return res.status(201).json(newPerformance);
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to create performance",
        error.statusCode || 500
      )
    );
  }
};

const updatePerformance = async (req, res, next) => {
  const { performanceId } = req.params;
  const { title, theaterId, description, price, performanceDate, creatorsId } =
    req.body;

  const poster = req.files.poster ? req.files.poster[0] : null;
  const images = req.files && req.files.files ? req.files.files : [];

  let parsedPerformanceDates = [];
  
  const updateData = {};
  if (title) updateData.title = title;
  if (theaterId) updateData.theaterId = theaterId;
  if (description) updateData.description = description;
  if (price) updateData.price = Number(price);
  if (performanceDate) {
    parsedPerformanceDates = makeParsedPerformanceDates(performanceDate);
    updateData.performanceDate = parsedPerformanceDates;
  }

  let parsedCreatorsIds = {};
  try {
    parsedCreatorsIds = creatorsId
      ? JSON.parse(creatorsId)
      : { toAdd: [], toRemove: [] };
  } catch (error) {
    return next(new HttpError("Invalid creatorsId format, must be JSON", 400));
  }

  const { toAdd = [], toRemove = [] } = parsedCreatorsIds;

  try {
    await performanceValidationSchemaForUpdate.validate({
      price,
      performanceDate: parsedPerformanceDates,
    });

    const updatedPerformance = await performancesService.update(
      performanceId,
      updateData,
      poster,
      images,
      { toAdd, toRemove }
    );
    return res.status(200).json({ updatedPerformance });
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to update performance",
        error.statusCode || 500
      )
    );
  }
};

const destroyPerformance = async (req, res, next) => {
  const { performanceId } = req.params;
  try {
    const deletedPerformance = await performancesService.destroy(performanceId);
    return res.status(200).json({ deletedPerformance });
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to delete performance",
        error.statusCode || 500
      )
    );
  }
};

const deleteImage = async (req, res, next) => {
  const { imageUrl } = req.body;
  const { performanceId } = req.params;
  try {
    const deletedImage = await performancesService.deleteSingleImage(
      performanceId,
      imageUrl
    );
    return res.status(200).json({ deletedImage });
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to delete image",
        error.statusCode || 500
      )
    );
  }
};

export default {
  createPerformance,
  updatePerformance,
  destroyPerformance,
  listPerformances,
  getPerformanceByID,
  deleteImage,
};
