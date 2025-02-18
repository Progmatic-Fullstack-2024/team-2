import express from "express";
import creatorsController from "../controllers/creators.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
// import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/dropdown-data-creators",
  creatorsController.getCreatorsForDropdown
);
router.get("/", creatorsController.list);
router.get("/:id", creatorsController.getById);

router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  creatorsController.update
);

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  creatorsController.create
);

router.delete("/:id", creatorsController.destroy);

export default router;
