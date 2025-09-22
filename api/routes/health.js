import { Router } from "express";
import mongoose from "mongoose";
import { logger } from "../utils/logger/index.js";
import { connectToDatabase } from "../config/database.js";


const router = Router();

router.get("/health", async (req, res) => {
  try {
    let state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

    if (state !== 1) {
      try {
        await connectToDatabase();
        state = mongoose.connection.readyState;
      } catch (_) {}
    }

    if (state === 1) {
      logger.info("Database connected");
      return res.json({ status: "ok", database: "connected" });
    }
    if (state === 2) {
      logger.info("Database connecting");
      return res.status(202).json({ status: "degraded", database: "connecting" });
    }
    logger.info("Database disconnected");
    return res.status(503).json({ status: "degraded", database: "disconnected" });
  } catch (error) {
    logger.info("Database unknown");
    return res.status(503).json({ status: "degraded", database: "unknown" });
  }
});

export default router;


