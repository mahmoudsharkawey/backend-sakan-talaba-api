import { Router } from "express";
import healthRouter from "./health.js";
import scrapedApartmentRouter from "./scrapedApartment.js";

const router = Router();

router.use(healthRouter);
router.use(scrapedApartmentRouter);
export default router;
