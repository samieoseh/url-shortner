type LogLevel = "INFO" | "ERROR";

function log(level: LogLevel, message: string, meta?: unknown) {
  const timestamp = new Date().toISOString();
  const suffix = meta ? ` ${JSON.stringify(meta)}` : "";

  console.log(`[${timestamp}] [${level}] ${message}${suffix}`);
}

export const logger = {
  info(message: string, meta?: unknown) {
    log("INFO", message, meta);
  },
  error(message: string, meta?: unknown) {
    log("ERROR", message, meta);
  },
};
