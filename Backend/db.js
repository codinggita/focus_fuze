const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const dbName = "focus_fuze";

let client;
let db;

async function connectToDatabase() {
  if (!client) {
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db(dbName);
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }
  return db;
}

function getDb() {
  if (!db) throw new Error('Database not initialized. Call connectToDatabase first.');
  return db;
}

module.exports = { connectToDatabase, getDb };