import express from "express";
import paymentController from "../controllers/payment.controller.js";

const router = express.Router();

router.get("/config", paymentController.config);
router.post("/create-payment-intent", paymentController.createPaymentIntent);

export default router;
