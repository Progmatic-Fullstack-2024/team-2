import express from "express";
import bookingController from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/:userId", bookingController.getByUserId);

export default router;
