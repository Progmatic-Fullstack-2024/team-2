import express from "express";
import userSeasonTicketController from "../controllers/user-season-ticket.controller.js";

const router = express.Router();

router.get("/", userSeasonTicketController.list);
router.get("/:id", userSeasonTicketController.getById);
router.post("/", userSeasonTicketController.create);
router.delete("/:id", userSeasonTicketController.destroy);

export default router;
