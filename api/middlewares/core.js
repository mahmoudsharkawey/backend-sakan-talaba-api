import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
// Avoid process.env in serverless bundle; use globalThis.APP_CONFIG if set (local only)
const APP_CONFIG = globalThis.APP_CONFIG || {};

export function applyCoreMiddlewares(app) {
  app.disable("x-powered-by");

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  const corsOriginsRaw = APP_CONFIG.corsOrigins ?? "*";
  let corsOptions;
  if (corsOriginsRaw === "*") {
    corsOptions = {
      origin: true, // Allow all origins
      credentials: true,
    };
  } else {
    const corsOrigins = corsOriginsRaw
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);
    corsOptions = {
      origin: corsOrigins,
      credentials: true,
    };
  }
  app.use(cors(corsOptions));

  app.use(helmet());
  app.use(compression());

  const limiter = rateLimit({
    windowMs: APP_CONFIG.rateLimitWindowMs ? Number(APP_CONFIG.rateLimitWindowMs) : 15 * 60 * 1000,
    max: APP_CONFIG.rateLimitMax ? Number(APP_CONFIG.rateLimitMax) : 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}

export default applyCoreMiddlewares;


