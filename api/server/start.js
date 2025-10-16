import config from "../config/env.js";
import { connectToDatabase } from "../config/database.js";
import { logger } from "../utils/logger/index.js";
import app, { createServer } from "./index.js";

async function start() {
  try {
    // Expose env values to app without bundling process.env in serverless path
    globalThis.APP_CONFIG = {
      corsOrigins: config.corsOrigins,
      rateLimitWindowMs: config.rateLimitWindowMs,
      rateLimitMax: config.rateLimitMax,
    };

    try {
      await connectToDatabase();
      logger.info("Connected to MongoDB");
    } catch (dbError) {
      logger.warn(
        "Could not connect to MongoDB on startup; continuing without DB",
        "DB_CONNECTION_ERROR",
        { error: dbError.message }
      );
    }

    // ✅ Use the PORT provided by the hosting platform or fallback to your config/env
    const port = process.env.PORT || config.port || 3000;

    // ✅ Important: listen on 0.0.0.0 (not localhost)
    app.listen(port, "0.0.0.0", () => {
      logger.info(`✅ Server running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    logger.error("Failed to start server", { error: error.message });
    process.exit(1);
  }
}

start();
