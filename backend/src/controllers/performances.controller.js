import { createFiles } from "../services/file.service.js";
import performancesService from "../services/performances.service.js";
import HttpError from "../utils/HttpError.js";
import performanceValidationSchemaForCreate from "../validations/performanceValidation.js";

const createPerformance = async (req, res, next) => {
  const { title, theaterId, description, price, performanceDate, creatorsId } =
    req.body;
  const poster = req.files ? req.files[0] : null;
  const images = req.files ? req.files.slice(1) : [];
  try {
    await performanceValidationSchemaForCreate.validate({
      title,
      theaterId,
      description,
      price,
      performanceDate,
      creatorsId,
    });

    const posterUrl = await createFiles([poster]); // Handle single poster upload
    const imageUrls = await createFiles(images); // Handle multiple image uploads
    const newPerformance = await performancesService.create(
      {
        title,
        theaterId,
        description,
        performanceDate,
        creatorsId,
        price: Number(price),
      },
      posterUrl[0], // Single poster URL
      imageUrls, // Multiple image URLs
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
};
