import { Router } from 'express';
import ScrapedApartment from '../models/scrapedApartment.js';

const router = Router();

// GET /api/scraped-apartments - return all scraped apartments
router.get('/scraped-apartments', async (req, res, next) => {
  try {
    const docs = await ScrapedApartment.find()
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

export default router;
