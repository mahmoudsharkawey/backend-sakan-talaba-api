import Apartment from "../models/scrapedApartment.js";
import fs from "fs";
import { connectToDatabase, closeDatabaseConnection } from "./database.js";
import { logger } from "../utils/logger/index.js";
import path from "path";
import { fileURLToPath } from "url";

// Derive __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

await connectToDatabase();
console.log(path.join(__dirname, "../data/aqarmap_all_furnished.json"));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/aqarmap_all_furnished.json"), "utf8"));

try {
  await Apartment.deleteMany();

  // helper to convert Arabic-Indic and Extended Arabic-Indic digits to ASCII digits
  const toAsciiDigits = (str) => {
    if (typeof str !== "string") return str;
    const map = {
      '\u0660': '0','\u0661': '1','\u0662': '2','\u0663': '3','\u0664': '4','\u0665': '5','\u0666': '6','\u0667': '7','\u0668': '8','\u0669': '9',
      '\u06F0': '0','\u06F1': '1','\u06F2': '2','\u06F3': '3','\u06F4': '4','\u06F5': '5','\u06F6': '6','\u06F7': '7','\u06F8': '8','\u06F9': '9'
    };
    return str.replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (d) => map[d] || d);
  };

  const parseNumber = (val) => {
    if (val == null) return null;
    if (typeof val === 'number') return val;
    // convert Arabic digits, remove non-digit except dot and minus
    const s = toAsciiDigits(String(val)).replace(/[^0-9.\-]/g, '');
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : null;
  };

  const normalized = data.map((doc) => ({
    ...doc,
    area: parseNumber(doc.area),
    price: parseNumber(doc.price),
  }));

  // insert with ordered:false so one bad doc doesn't stop the whole batch
  const insertedDocs = await Apartment.insertMany(normalized, { ordered: false });
  logger.info(`Seeded ${insertedDocs.length} apartments`);
} catch (err) {
  logger.error("Error seeding data:", err);
}

await closeDatabaseConnection();
