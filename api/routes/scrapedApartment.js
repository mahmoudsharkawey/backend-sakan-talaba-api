import { Router } from "express";
import ScrapedApartment from "../models/scrapedApartment.js";

const router = Router();

// GET /api/scraped-apartments - return all scraped apartments
router.get("/scraped-apartments", async (req, res, next) =>{
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const apartments = await ScrapedApartment.find().skip(skip).limit(limit).lean();
    const total = await ScrapedApartment.countDocuments();

   res.json({
      success: true,
      data: apartments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
