import { Router } from "express";
import { asyncHandler } from "@app/shared";
import { proxyJsonRequest } from "../lib/proxyRequest";

export function createAuthGatewayRoutes(authServiceUrl: string) {
  const router = Router();

  router.post(
    "/register",
    asyncHandler((req, res) =>
      proxyJsonRequest(req, res, `${authServiceUrl}/api/auth/register`),
    ),
  );
  router.post(
    "/login",
    asyncHandler((req, res) =>
      proxyJsonRequest(req, res, `${authServiceUrl}/api/auth/login`),
    ),
  );

  return router;
}
