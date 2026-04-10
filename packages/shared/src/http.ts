import type { NextFunction, Request, Response } from "express";
import { AppError } from "./errors";
import { logger } from "./logger";

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  logger.error("Unhandled application error", {
    name: error.name,
    message: error.message,
  });

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
