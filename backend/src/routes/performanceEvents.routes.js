import express from "express";
import multer from "multer";

import performanceEventsController from "../controllers/performanceEvents.controller.js";

const router = express.Router();
const upload = multer();

router.get("/", performanceEventsController.list);
router.get("/:id", performanceEventsController.getById);

router.post("/", upload.none(), performanceEventsController.create);

router.put("/:id", upload.none(), performanceEventsController.update);

router.delete("/:id", performanceEventsController.destroy);

export default router;
