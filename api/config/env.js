import dotenv from "dotenv";

// Load environment variables from .env if present
dotenv.config();

const environment = process.env.NODE_ENV || "development";
const isProduction = environment === "production";

export const config = {
  environment,
  isProduction,
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sakan-talaba",
  mongoDbName: process.env.MONGODB_DB || "sakan-talaba",
  corsOrigins: (process.env.CORS_ORIGINS || "*")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
  },
};

export default config;


