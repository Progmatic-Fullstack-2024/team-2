import express from "express";
import genresController from "../controllers/genres.controller.js";

const router = express.Router();

router.get("/", genresController.listAllGenres);

export default router;
