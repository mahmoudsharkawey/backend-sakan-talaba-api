import dotenv from "dotenv";

// Load environment variables from .env if present
dotenv.config();

// Export ONLY raw strings from process.env to avoid build-time analyzers
export const config = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  mongoDbName: process.env.MONGODB_DB,
  corsOrigins: process.env.CORS_ORIGINS,
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS,
  rateLimitMax: process.env.RATE_LIMIT_MAX,
  logLevel: process.env.LOG_LEVEL,
};

export default config;


