import config from "../config/env.js";
import { connectToDatabase } from "../config/database.js";
import { logger } from "../utils/logger/index.js";
import app from "./index.js";

async function start() {
  try {
    // expose app config
    globalThis.APP_CONFIG = {
      corsOrigins: config.corsOrigins,
      rateLimitWindowMs: config.rateLimitWindowMs,
      rateLimitMax: config.rateLimitMax,
    };

    // connect to db
    try {
      await connectToDatabase();
      logger.info("Connected to MongoDB");
    } catch (dbError) {
      logger.warn("Could not connect to MongoDB on startup; continuing without DB", {
        error: dbError.message,
      });
    }

    // read port (default: 8080)
    const port = process.env.PORT || 8080;

    // start server
    app.listen(port, "0.0.0.0", () => {
      logger.info(`🚀 Server running on http://0.0.0.0:${port}`);
    });

  } catch (error) {
    logger.error("Failed to start server", { error: error.message });
    process.exit(1);
  }
}

start();
