import express from "express";
import theaterAdminController from "../controllers/theaterAdmin.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.delete("/:id", isAdmin, theaterAdminController.deleteTheaterAdmin);
router.post("/newTheaterAdmin", isAdmin, theaterAdminController.create);

export default router;
