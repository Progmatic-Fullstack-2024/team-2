import express from "express";
import bookingController from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/:userId", bookingController.getByUserId);
router.get(
  "/event/:performanceEventId",
  bookingController.getPerformanceEventSoldSeats,
);
router.post("/buyticket", bookingController.buyTicket);
router.put("/sendqrcodemail", bookingController.sendQrCodeMail);

export default router;
