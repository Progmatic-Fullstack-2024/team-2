import express from "express";
import bookingController from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/:userId", bookingController.getByUserId);
router.get("/:performanceEventId", bookingController.getPerformanceEventSoldSeats);
router.post("/buyticket", bookingController.buyTicket);

export default router;
