const mongoose = require('mongoose');

let useInMemory = false;
const inMemoryStorage = new Map();

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
  
  if (!mongoUri) {
    console.log('⚠️  No MongoDB URI found. Using in-memory storage.');
    useInMemory = true;
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Falling back to in-memory storage.');
    useInMemory = true;
  }
}

function isUsingInMemory() {
  return useInMemory;
}

function getInMemoryStorage() {
  return inMemoryStorage;
}

module.exports = {
  connectDatabase,
  isUsingInMemory,
  getInMemoryStorage
};
