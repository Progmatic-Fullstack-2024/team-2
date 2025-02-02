import express from "express";
import seasonTicketsController from "../controllers/season-tickets.controller.js";

const router = express.Router();

router.get("/", seasonTicketsController.list);
router.post("/", seasonTicketsController.create);

export default router;
