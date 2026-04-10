import "dotenv/config";
import { z } from "zod";
import { logger, parseEnv } from "@app/shared";
import { createApp } from "./app";

const env = parseEnv({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  AUTH_SERVICE_URL: z.string().url().default("http://localhost:4001"),
});

const app = createApp({
  authServiceUrl: env.AUTH_SERVICE_URL,
});

const server = app.listen(env.PORT, () => {
  logger.info("api-gateway listening", {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  });
});

function shutdown() {
  logger.info("api-gateway shutting down");
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
