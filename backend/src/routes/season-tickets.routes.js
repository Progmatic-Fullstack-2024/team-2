import express from "express";
import seasonTicketsController from "../controllers/season-tickets.controller.js";

const router = express.Router();

router.get("/", seasonTicketsController.list);
router.get("/:id", seasonTicketsController.getById);
router.get("/user/:userId", seasonTicketsController.getByUserId);
router.post("/", seasonTicketsController.create);

export default router;
