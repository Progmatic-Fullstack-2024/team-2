
import express from "express"; 
import { formData } from "../middlewares/multer-middleware.js";
import authControll from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/registration", formData.none(),authControll.registration);
import express from "express";
import authController from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/login", authController.login);

export default router;
