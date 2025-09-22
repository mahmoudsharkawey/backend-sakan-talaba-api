import mongoose from "mongoose";
import { config } from "./env.js";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  await mongoose.connect(config.mongoUri, {
    dbName: config.mongoDbName,
  });

  isConnected = mongoose.connection.readyState === 1;
  return mongoose.connection;
}

export function getDatabase() {
  if (!mongoose.connection || mongoose.connection.readyState !== 1) {
    throw new Error("Database not initialized. Call connectToDatabase() first.");
  }
  return mongoose.connection;
}

export async function closeDatabaseConnection() {
  if (mongoose.connection && mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    isConnected = false;
  }
}


