import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import performancesController from "../controllers/performances.controller.js";

const router = express.Router();

router.get("/all", performancesController.listAllPerformances);
router.get("/isOwn/:id/:userId", performancesController.isOwn);
router.get("/:performanceId", performancesController.getPerformanceByID);
router.get("/", performancesController.listPerformances);

router.post(
  "/",
  // isAdmin,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ]),
  performancesController.createPerformance
);

router.patch(
  "/:performanceId",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ]),
  performancesController.updatePerformance
);

router.delete("/:performanceId", performancesController.destroyPerformance);

router.patch("/:performanceId/image", performancesController.deleteImage);

export default router;
