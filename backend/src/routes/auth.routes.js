import express from "express";
import formData from "../middlewares/multer.middleware.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/registration", formData.none(), authController.registration);

router.post("/login", authController.login);

export default router;
