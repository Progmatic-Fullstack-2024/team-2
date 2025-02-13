import { parse, formatISO } from "date-fns"; // date-fns könyvtárat használjuk a dátum kezelésére
import performanceEventsService from "../services/performanceEvents.service.js";

const list = async (req, res, next) => {
  try {
    const performanceEvents = await performanceEventsService.list();
    res.status(200).json(performanceEvents);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const performanceEventById = await performanceEventsService.getById(id);
    res.status(200).json(performanceEventById);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { spots, performanceId, performanceDate } = req.body;

  console.log(performanceDate);

  try {
    if (!performanceDate) {
      return res.status(400).json({ error: "Missing performanceDate" });
    }

    // Converting Date: "2025-03-12 19.00" → ISO form
    const parsedDate = parse(performanceDate, "yyyy-MM-dd HH.mm", new Date());

    if (Number.isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Creating ISO form date
    const formattedDate = formatISO(parsedDate, { representation: "complete" });

    const newPerformanceEvent = await performanceEventsService.create({
      spots: Number(spots),
      performanceId,
      performanceDate: formattedDate, // Updated form for date
    });

    return res.status(201).json(newPerformanceEvent);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { spots, soldSpots, performanceId } = req.body;
  let { performanceDate } = req.body;

  if (performanceDate) {
    const parsedDate = parse(performanceDate, "yyyy-MM-dd HH.mm", new Date());

    if (Number.isNaN(parsedDate)) {
      return res
        .status(400)
        .json({ error: "Invalid date format, expected YYYY-MM-DD HH.mm" });
    }

    performanceDate = formatISO(parsedDate, { representation: "complete" });
  }

  try {
    const performanceEventUpdated = await performanceEventsService.update(id, {
      spots: Number(spots),
      soldSpots: Number(soldSpots),
      performanceId,
      performanceDate,
    });
    return res.status(200).json(performanceEventUpdated);
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPerformanceEvent = await performanceEventsService.destroy(id);
    res.status(200).json({ deletedPerformanceEvent });
  } catch (error) {
    next(error);
  }
};

export default {
  list,
  getById,
  create,
  update,
  destroy,
};
