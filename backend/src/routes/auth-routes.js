/* eslint-disable prettier/prettier */
import express from "express"; 
import { formData } from "../middlewares/multer-middleware.js";
import authControll from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/registration", formData.none(),authControll.registration);

export default router;
