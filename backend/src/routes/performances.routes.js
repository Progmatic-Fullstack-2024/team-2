import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import performancesController from "../controllers/performances.controller.js";

const router = express.Router();

router.get("/all", performancesController.listAllPerformances);
router.get("/:performanceId", performancesController.getPerformanceByID);
router.get("/", performancesController.listPerformances);

router.post(
  "/",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ]),
  performancesController.createPerformance,
);

router.delete(
  "/:performanceId",
  isAdmin,
  performancesController.destroyPerformance,
);

router.patch(
  "/:performanceId",
  isAdmin,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ]),
  performancesController.updatePerformance,
);

router.patch(
  "/:performanceId/image",
  isAdmin,
  performancesController.deleteImage,
);

export default router;
