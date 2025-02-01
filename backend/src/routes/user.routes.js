import express from "express";
import userController from "../controllers/user.controllers.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/own", isAuthenticated, userController.getOwnUser);
router.get("/:id", isAdmin, userController.getUser);
router.get("/", isAdmin, userController.listUsers);
router.patch("/passwordChange", isAuthenticated, userController.passwordChange);
router.patch("/", isAuthenticated, userController.updateUser);
router.delete("/:id", isAdmin, userController.deleteUser);


export default router;
