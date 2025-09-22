import { Router } from "express";
import mongoose from "mongoose";
import { logger } from "../utils/logger/index.js";


const router = Router();

router.get("/health", async (req, res) => {
  try {
    const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (state === 1) {
      res.json({ status: "ok", database: "connected" });
      logger.info("Database connected");
    } else if (state === 2) {
      res.status(202).json({ status: "degraded", database: "connecting" });
      logger.info("Database connecting");
    } else {
      res.status(503).json({ status: "degraded", database: "disconnected" });
      logger.info("Database disconnected");
    }
  } catch (error) {
    res.status(503).json({ status: "degraded", database: "unknown" });
    logger.info("Database unknown");
  }
});

export default router;


