Seed instructions

Make sure you have a `.env` file at the project root with at least the following variables:

- MONGODB_URI - MongoDB connection URI
- MONGODB_DB - Database name

Then run from project root (bash on Windows works):

```bash
npm run seed
```

This runs `node api/config/seed.js` which connects to the DB, normalizes numeric fields, clears the `apartments` collection, and inserts records from `api/data/aqarmap_all_furnished.json`.
