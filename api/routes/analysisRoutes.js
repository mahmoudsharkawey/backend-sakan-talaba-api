import { Router } from 'express';
const router = Router();

import {
    getAveragePriceByLocation,
    getAreaDistribution,
    getAdvertiserTypeAnalysis
} from '../services/AnalysisService.js';

// Route for getting average price by location
router.get('/average-price-by-location', getAveragePriceByLocation);

// Route for getting area distribution analysis
router.get('/area-distribution', getAreaDistribution);

// Route for getting advertiser type analysis
router.get('/advertiser-type', getAdvertiserTypeAnalysis);

export default router;
