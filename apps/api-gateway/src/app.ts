import express from "express";
import { errorHandler, notFoundHandler } from "@app/shared";
import { createAuthGatewayRoutes } from "./routes/authGatewayRoutes";

type GatewayConfig = {
  authServiceUrl: string;
};

export function createApp(config: GatewayConfig) {
  const app = express();

  app.use(express.json());

  app.get("/healthz", (_req, res) => {
    res.json({
      service: "api-gateway",
      status: "ok",
    });
  });

  app.use("/api/auth", createAuthGatewayRoutes(config.authServiceUrl));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
