import type { Request, Response } from "express";
import { asyncHandler } from "@app/shared";
import { authService } from "../services/auth.service";

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const user = authService.register(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const session = authService.login(req.body);

    res.json({
      success: true,
      data: session,
    });
  }),

  listUsers: asyncHandler(async (_req: Request, res: Response) => {
    res.json({
      success: true,
      data: authService.listUsers(),
    });
  }),
};
