import performancesService from "../services/performances.service.js";
import HttpError from "../utils/HttpError.js";
import performanceValidationSchemaForCreate from "../validations/performanceValidation.js";
import { createFiles } from "../services/file.service.js";

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

const createPerformance = async (req, res, next) => {
  const { title, theaterId, description, price, performanceDate } = req.body;

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
  const { title, theater, description, price, performanceDate, creators } =
    req.body;
  const poster = req.files[0] || null;
  const images = req.files.slice(1) || [];
  const posterUrl = await createFiles([poster]); // Handle single poster upload
  const imageUrls = await createFiles(images); // Handle multiple image uploads

  try {
    const updatedPerformance = await performancesService.update(
      performanceId,
      {
        title,
        theater,
        description,
        performanceDate,
        creators,
        price: Number(price),
      },
      posterUrl[0], // Single poster URL
      imageUrls, // Multiple image URLs
    );
    res.status(200).json({ updatedPerformance });
  } catch (error) {
    next(
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
