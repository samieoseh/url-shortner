import express from "express";
import { errorHandler, notFoundHandler } from "@app/shared";
import { authRoutes } from "./routes/auth.route";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/healthz", (_req, res) => {
    res.json({
      service: "auth-service",
      status: "ok",
    });
  });

  app.use("/api/auth", authRoutes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
