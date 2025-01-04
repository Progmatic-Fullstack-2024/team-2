import express from "express";
import registrationController from "../controllers/registration.controller.js";

const router = express.Router();

router.post("/", registrationController.create);

export default router;
