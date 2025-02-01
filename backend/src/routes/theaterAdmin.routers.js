import express from "express";
import userController from "../controllers/user.controllers.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.delete("/:id",isAdmin,userController.deleteTheaterAdmin);
router.post("/newTheaterAdmin",isAdmin,userController.newTheaterAdmin);

export default router;