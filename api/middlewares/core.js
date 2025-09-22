import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { config } from "../config/env.js";

export function applyCoreMiddlewares(app) {
  app.disable("x-powered-by");

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  const corsOrigins = (config.corsOrigins ?? "*")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.use(
    cors({
      origin: corsOrigins.length === 1 && corsOrigins[0] === "*" ? true : corsOrigins,
      credentials: true,
    })
  );

  app.use(helmet());
  app.use(compression());

  const limiter = rateLimit({
    windowMs: config.rateLimitWindowMs ? Number(config.rateLimitWindowMs) : 15 * 60 * 1000,
    max: config.rateLimitMax ? Number(config.rateLimitMax) : 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}

export default applyCoreMiddlewares;


