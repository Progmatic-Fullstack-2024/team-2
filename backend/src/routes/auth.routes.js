import express from "express";
import formData, { upload } from "../middlewares/multer.middleware.js";
import authController from "../controllers/auth.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import performanceController from "../controllers/performance.controller.js";

const router = express.Router();

router.post("/registration", formData.none(), authController.registration);
router.post("/login", formData.none(), authController.login);
router.get("/users/own", isAuthenticated, authController.getOwnUser);
router.get("/users/:id", isAdmin, authController.getUser);
router.get("/users", isAdmin, authController.listUsers);
router.patch("/users", isAuthenticated, authController.updateUser);
router.delete("/users/:id", isAdmin, authController.deleteUser);
router.post(
  "/performance",
  isAdmin,
  upload.array("files", 10),
  performanceController.createPerformance,
);
router.delete(
  "/performance/:performanceId",
  isAdmin,
  performanceController.destroyPerformance,
);
router.patch(
  "/performance/:performanceId",
  isAdmin,
  performanceController.updatePerformance,
);

export default router;
