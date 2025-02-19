import performancesService from "../services/performances.service.js";
import HttpError from "../utils/HttpError.js";
import queryFilter from "../utils/queryFilter.js";
import performanceValidationSchemaForCreate from "../validations/performanceValidation.js";
import performanceEventsService from "../services/performanceEvents.service.js";

const listPerformances = async (req, res, next) => {
  const { search } = req.query;

  // Filter options:
  // page = 1 - which page do you want
  // limit = 12 - number of peformances in 1 page
  // orderBy - date, title etc...
  // sort - "asc" or "desc"
  // theater - requires the id of theater
  // startDate - returns performances AFTER this date
  // endDate - returns performances BEFORE this date
  // targetAudience - needs exact targetAudience name
  // futureOnly=true - filters only performances witch have futurePerformaanceDetails

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

const isOwn = async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    const isOwnPerformance = await performancesService.isOwn(id, userId);
    res.status(200).json(isOwnPerformance !== null);
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

  const poster = req.files.poster ? req.files.poster[0] : null;
  const images = req.files && req.files.files ? req.files.files : [];

  try {
    await performanceValidationSchemaForCreate.performanceValidationSchemaForCreate.validate(
      {
        title,
        theaterId,
        description,
        creators,
      }
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
      creators
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
  const { title, theaterId, description, targetAudience } = req.body;

  let { creatorIds, performanceEventIds } = req.body;

  // If one link arrives (string) convert to array
  if (typeof creatorIds === "string") {
    creatorIds = [creatorIds];
  }

  if (typeof performanceEventIds === "string") {
    performanceEventIds = [performanceEventIds];
  }

  const creators = Array.isArray(creatorIds)
    ? creatorIds.map((creatorId) => ({ id: creatorId }))
    : [];

  const newPerformanceEvents = Array.isArray(performanceEventIds)
    ? performanceEventIds // ✅ Már egy tömb, nincs szükség további map-re
    : [];

  console.log("Final creators array:", creators);
  console.log(
    "Final performanceEvents array (from frontend):",
    newPerformanceEvents
  );

  const poster = req.files?.poster ? req.files.poster[0] : null;
  const images = req.files?.files ? req.files.files : [];

  try {
    // Lekérjük a meglévő performance adatokat, hogy összehasonlítsuk az eseményeket
    const existingPerformance =
      await performancesService.getById(performanceId);
    if (!existingPerformance) {
      throw new HttpError("Performance not found", 404);
    }

    const existingEventIds = existingPerformance.performanceEvents.map(
      (event) => event.id
    );
    console.log("Existing performanceEvents (DB):", existingEventIds);

    // Azokat az ID-kat keressük meg, amelyek NINCSENEK az új listában → ezeket törölni kell
    const eventsToRemove =
      Array.isArray(performanceEventIds) && performanceEventIds.length > 0
        ? existingEventIds.filter((id) => !performanceEventIds.includes(id))
        : [];

    console.log("PerformanceEvents to remove:", eventsToRemove);

    // Ha van olyan event, amit törölni kell, akkor azt eltávolítjuk az adatbázisból
    if (eventsToRemove.length > 0) {
      await performanceEventsService.destroyMany(eventsToRemove);
    }

    // Frissített Performance rekord hívása a service-ben
    const updatedPerformance = await performancesService.update(
      performanceId,
      { title, theaterId, description, targetAudience },
      poster,
      images,
      creators,
      newPerformanceEvents // Csak az új performanceEventek listáját adjuk át
    );

    return res.status(200).json(updatedPerformance);
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
  console.log("🔹 DELETE IMAGE API CALL");
  console.log("➡️ Body:", req.body);
  console.log("➡️ Params:", req.params);

  const { imageUrl } = req.body;
  const { performanceId } = req.params;
  try {
    const deletedImage = await performancesService.deleteSingleImage(
      performanceId,
      imageUrl
    );
    return res.status(200).json({ performanceWithDeletedImage: deletedImage });
  } catch (error) {
    return next(
      new HttpError(
        error.message || "Failed to delete image",
        error.statusCode || 500
      )
    );
  }
};

const addFollowerToPerformance = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const performanceFollowed = await performancesService.addFollower(id, {
      userId,
    });
    res.status(201).json(performanceFollowed);
  } catch (error) {
    next(error);
  }
};

const removeFollowerFromPerformance = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const performanceUnfollowed = await performancesService.removeFollower(id, {
      userId,
    });
    res.status(200).json(performanceUnfollowed);
  } catch (error) {
    next(error);
  }
};

export default {
  createPerformance,
  updatePerformance,
  destroyPerformance,
  listPerformances,
  listAllPerformances,
  getPerformanceByID,
  isOwn,
  deleteImage,
  addFollowerToPerformance,
  removeFollowerFromPerformance,
};
