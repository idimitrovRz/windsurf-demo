type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_ENABLED = import.meta.env.DEV;

function log(level: LogLevel, message: string, ...args: unknown[]): void {
  if (!LOG_ENABLED) {
    return;
  }

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  switch (level) {
    case "debug":
      console.debug(prefix, message, ...args);
      break;
    case "info":
      console.info(prefix, message, ...args);
      break;
    case "warn":
      console.warn(prefix, message, ...args);
      break;
    case "error":
      console.error(prefix, message, ...args);
      break;
  }
}

export const logger = {
  debug: (message: string, ...args: unknown[]) =>
    log("debug", message, ...args),
  info: (message: string, ...args: unknown[]) => log("info", message, ...args),
  warn: (message: string, ...args: unknown[]) => log("warn", message, ...args),
  error: (message: string, ...args: unknown[]) =>
    log("error", message, ...args),
};
