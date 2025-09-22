import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  mongoDbName: process.env.MONGODB_DB,
  corsOrigins: process.env.CORS_ORIGINS,
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS,
  rateLimitMax: process.env.RATE_LIMIT_MAX,
  logLevel: process.env.LOG_LEVEL,
};

export default config;


