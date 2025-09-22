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

// For Vercel/serverless export the app directly (no local bootstrap here)
const app = createServer();
export default app;
