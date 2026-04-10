import { Router } from "express";
import { authController } from "../controller/auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
