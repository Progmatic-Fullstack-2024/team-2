import express from "express";
import formData from "../middlewares/multer.middleware2.js";
import authController from "../controllers/auth.controller2.js";

const router = express.Router();

router.post("/registration", formData.none(), authController.registration);
router.post("/login", formData.none(), authController.login);

export default router;
