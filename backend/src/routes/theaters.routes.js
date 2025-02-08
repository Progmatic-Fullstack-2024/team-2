import express from "express";
import theatersController from "../controllers/theaters.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/dropdown-data-theaters", theatersController.getTheaterForDropdown);
router.get("/:theaterId", theatersController.getTheaterById);
router.get("/", theatersController.listAllTheaters);

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  theatersController.createTheater,
);

router.patch(
  "/:theaterId",
  upload.fields([{ name: "image", maxCount: 1 }]),
  theatersController.updateTheater,
);

router.patch("/:theaterId/image", theatersController.deleteImage);

router.delete("/:theaterId", isAdmin, theatersController.destroyTheater);

export default router;
