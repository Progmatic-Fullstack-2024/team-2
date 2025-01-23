import express from "express";
import theatersController from "../controllers/theaters.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAdmin, theatersController.getTheaterForDropdown);

export default router;
