import express from "express";
import creatorsController from "../controllers/creators.controller.js";
// import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", creatorsController.getCreatorsForDropdown);

export default router;
