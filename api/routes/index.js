import { Router } from "express";
import healthRouter from "./health.js";
import scrapedApartmentRouter from "./scrapedApartment.js";
import analysisRoutes from "./analysisRoutes.js";

const router = Router();

router.use(healthRouter);
router.use(scrapedApartmentRouter);
router.use("/analysis",analysisRoutes);

export default router;
