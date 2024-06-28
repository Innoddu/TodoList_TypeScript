import * as UserController from "../controllers/users";
import express from "express";
import { requiresAuth } from "../midleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/signup", UserController.createUser);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;