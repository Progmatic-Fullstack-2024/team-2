import performancesService from "../services/performances.service.js";
import HttpError from "../utils/HttpError.js";
import queryFilter from "../utils/queryFilter.js";
import performanceValidationSchemaForCreate from "../validations/performanceValidation.js";

const listPerformances = async (req, res, next) => {
  const { search } = req.query;

  try {
    const performances = await performancesService.list({
      filter: queryFilter(req.query),
      search,
    });
    res.status(200).send(performances);
  } catch (error) {
    next(error);
  }
};

const listAllPerformances = async (req, res, next) => {
  try {
    const allPerformances = await performancesService.listAll();
    res.status(200).send(allPerformances);
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

const createPerformance = async (req, res, next) => {
  const { title, theaterId, description, creatorIds, targetAudience } =
    req.body;

  const creators = Array.isArray(creatorIds)
    ? creatorIds.map((creatorId) => ({ id: creatorId }))
    : [];

  // const creators = [{ id: creatorIds }];

  const poster = req.files.poster ? req.files.poster[0] : null;
  const images = req.files && req.files.files ? req.files.files : [];

  try {
    await performanceValidationSchemaForCreate.performanceValidationSchemaForCreate.validate(
      {
        title,
        theaterId,
        description,
        creators,
      },
    );

    const newPerformance = await performancesService.create(
      {
        title,
        theaterId,
        description,
        targetAudience,
      },
      poster,
      images,
      creators,
    );
    return res.status(201).json(newPerformance);
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to create performance",
        error.statusCode || 500,
      ),
    );
  }
};

const updatePerformance = async (req, res, next) => {
  const { performanceId } = req.params;
  const { title, theaterId, description, targetAudience } = req.body;

  let { creatorIds } = req.body;

  // If one link arrives (string) convert to array
  if (typeof creatorIds === "string") {
    creatorIds = [creatorIds];
  }

  const creators = Array.isArray(creatorIds)
    ? creatorIds.map((creatorId) => ({ id: creatorId }))
    : [];

  console.log("Final creators array:", creators);

  const poster = req.files?.poster ? req.files.poster[0] : null;
  const images = req.files?.files ? req.files.files : [];

  try {
    const updatedPerformance = await performancesService.update(
      performanceId,
      { title, theaterId, description, targetAudience },
      poster,
      images,
      creators,
    );
    return res.status(200).json(updatedPerformance);
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
    return res.status(200).json({ deletedPerformance });
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to delete performance",
        error.statusCode || 500,
      ),
    );
  }
};

const deleteImage = async (req, res, next) => {
  console.log("🔹 DELETE IMAGE API CALL");
  console.log("➡️ Body:", req.body);
  console.log("➡️ Params:", req.params);

  const { imageUrl } = req.body;
  const { performanceId } = req.params;
  try {
    const deletedImage = await performancesService.deleteSingleImage(
      performanceId,
      imageUrl,
    );
    return res.status(200).json({ performanceWithDeletedImage: deletedImage });
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to delete image",
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
  listAllPerformances,
  getPerformanceByID,
  deleteImage,
};
