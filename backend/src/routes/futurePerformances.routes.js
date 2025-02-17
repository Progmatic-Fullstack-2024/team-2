import express from "express";

import futurePerformancesController from "../controllers/futurePerformances.controller.js";

const router = express.Router();

router.get("/", futurePerformancesController.list);
router.get("/:id", futurePerformancesController.getById);

router.post("/", futurePerformancesController.create);

router.put("/:id", futurePerformancesController.update);

router.delete("/:id", futurePerformancesController.destroy);

export default router;
