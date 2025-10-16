import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
  url: { type: String },
  title: { type: String },
  price: { type: Number },
  location: { type: String },
  area: { type: Number },
  rooms: { type: Number },
  bathrooms: { type: Number },
  floor: { type: String },
  year_built: { type: Number },
  advertiser_type: { type: String },
  payment_method: { type: String },
  ad_number: { type: String },
  finishing: { type: String },
  // keep optional fields for other data in file
  description: { type: String },
  images: { type: [String] }
}, { timestamps: true, collection: 'scraped apartment' });

// Explicit model name 'ScrapedApartment' but use collection name 'scraped apartment'
const ScrapedApartment = mongoose.model('ScrapedApartment', apartmentSchema, 'scraped apartment');
export default ScrapedApartment;
