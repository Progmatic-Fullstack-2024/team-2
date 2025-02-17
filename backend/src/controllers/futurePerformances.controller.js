import futurePerformancesService from "../services/futurePerformances.service.js";
import performancesService from "../services/performances.service.js";

const list = async (req, res, next) => {
  try {
    const allFuturePerformances = await futurePerformancesService.list();
    res.status(200).json(allFuturePerformances);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const futurePerformanceById = await futurePerformancesService.getById(id);
    res.status(200).json(futurePerformanceById);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const {
    targetBudgetIdeal,
    targetBudget,
    minimumBudget,
    actualBudget,
    gift,
    performanceId,
  } = req.body;

  try {
    if (!performanceId) {
      return res
        .status(400)
        .json({ error: "Only existing performance can be future performance" });
    }
    const existingPerformance =
      await performancesService.getById(performanceId);

    if (
      existingPerformance.futurePerformance !== null &&
      existingPerformance.futurePerformance.id !== performanceId
    ) {
      return res.status(400).json({
        error: "One performance can only be made future performance only once",
      });
    }

    const newFuturePerformance = await futurePerformancesService.create({
      targetBudgetIdeal,
      targetBudget,
      minimumBudget,
      actualBudget,
      gift,
      performanceId,
    });
    return res.status(201).json(newFuturePerformance);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const {
    targetBudgetIdeal,
    targetBudget,
    minimumBudget,
    actualBudget,
    gift,
    performanceId,
  } = req.body;
  try {
    if (!performanceId) {
      return res.status(400).json({
        error:
          "Only existing performance can be updated into future performance",
      });
    }

    const futurePerformanceToUpdate = await futurePerformancesService.update(
      id,
      {
        targetBudgetIdeal,
        targetBudget,
        minimumBudget,
        actualBudget,
        gift,
        performanceId,
      },
    );
    return res.status(200).json(futurePerformanceToUpdate);
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const futurePerformanceToDelete =
      await futurePerformancesService.destroy(id);
    res.status(200).json({ futurePerformanceToDelete });
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
