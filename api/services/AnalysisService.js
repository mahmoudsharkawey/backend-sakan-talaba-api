import ScrapedApartment from "../models/scrapedApartment.js";
import logger from "../utils/logger/index.js";

const getAveragePriceByLocation = async (req, res, next) => {
  try {
    // TODO: Implement average price by location analysis
    // Example implementation:
    const averagePrices = await ScrapedApartment.aggregate([
        {
            $group: {
                _id: "$location",
                averagePrice: { $avg: "$price" }
            }
        }
    ]).exec();
    res.status(200).json({
      status: "success",
      data: {
        message: "Average price by location analysis",
        data: averagePrices
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAreaDistribution = async (req, res, next) => {
  try {
    // TODO: Implement area distribution analysis
    // Example implementation:
    const areaDistribution = await ScrapedApartment.aggregate([
        {
            $group: {
                _id: {
                    $switch: {
                        branches: [
                            { case: { $lte: ["$area", 50] }, then: "0-50" },
                            { case: { $lte: ["$area", 100] }, then: "51-100" },
                            { case: { $lte: ["$area", 150] }, then: "101-150" }
                        ],
                        default: "150+"
                    }
                },
                count: { $sum: 1 }
            }
        }
    ]);
    logger.info(areaDistribution);
    res.status(200).json({
      status: "success",
      data: {
        message: "Area distribution analysis",
        data: areaDistribution
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAdvertiserTypeAnalysis = async (req, res, next) => {
  try {
    // TODO: Implement advertiser type analysis
    // Example implementation:
    const advertiserTypes = await ScrapedApartment.aggregate([
      {
        $group: {
          _id: "$advertiserType",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        message: "Advertiser type analysis",
        data: advertiserTypes,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAveragePriceByLocation,
  getAreaDistribution,
  getAdvertiserTypeAnalysis,
};
