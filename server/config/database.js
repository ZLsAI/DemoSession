const mongoose = require('mongoose');

// In-memory storage for when MongoDB is not available
const inMemoryStorage = new Map();

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
  
  if (!mongoUri) {
    console.log('⚠️  MongoDB URI not provided. Using in-memory storage.');
    console.log('   Set MONGODB_URI or MONGO_URL environment variable to use MongoDB.');
    return { useInMemory: true };
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
    return { useInMemory: false };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('⚠️  Falling back to in-memory storage');
    return { useInMemory: true };
  }
};

module.exports = { connectDatabase, inMemoryStorage };
