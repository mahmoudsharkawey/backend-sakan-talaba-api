import express from "express";
import config from "../config/env.js";
import { connectToDatabase } from "../config/database.js";
import { logger } from "../utils/logger/index.js";
import httpLogger from "../middlewares/httpLogger.js";
import applyCoreMiddlewares from "../middlewares/core.js";
import { notFound, errorHandler } from "../middlewares/errors.js";
import routes from "../routes/index.js";

export function createServer() {
  const app = express();

  // Core and HTTP logging middlewares
  applyCoreMiddlewares(app);
  app.use(httpLogger);

  // Routes
  app.use("/api", routes);

  // Health root
  app.get("/", (req, res) => {
    res.json({ name: "Sakan Talaba API", status: "running" });
  });

  // 404 and error handlers
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

// For Vercel serverless export the app directly
const app = createServer();
export default app;

// Local bootstrap
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const start = async () => {
    try {
      try {
        await connectToDatabase();
        logger.info("Connected to MongoDB");
      } catch (dbError) {
        logger.warn(
          "Could not connect to MongoDB on startup; continuing without DB",
          "DB_CONNECTION_ERROR",
          {
            error: dbError.message,
          }
        );
      }
      app.listen(config.port, () => {
        logger.info(`Server running on http://localhost:${config.port}`);
      });
    } catch (error) {
      logger.error("Failed to start server", { error: error.message });
      process.exit(1);
    }
  };
  start();
}
