import { connectToDatabase, closeDatabaseConnection, getDatabase } from '../api/config/database.js';


async function run() {
  try {
    await connectToDatabase();
    const db = getDatabase();
    const count = await db.collection('scraped apartments').countDocuments();
    console.log('apartments count:', count);
  } catch (err) {
    console.error('Error checking seed:', err);
  } finally {
    await closeDatabaseConnection();
  }
}

run();
