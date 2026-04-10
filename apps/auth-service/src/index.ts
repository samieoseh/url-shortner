import "dotenv/config";
import { z } from "zod";
import { logger, parseEnv } from "@app/shared";
import { createApp } from "./app";

const env = parseEnv({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(4001),
  JWT_SECRET: z.string().min(16),
});

const app = createApp();
const server = app.listen(env.PORT, () => {
  logger.info("auth-service listening", {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  });
});

function shutdown() {
  logger.info("auth-service shutting down");
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
