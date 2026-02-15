const mongoose = require('mongoose');

// In-memory storage fallback
let inMemoryStorage = new Map();

const connectDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.warn('MongoDB connection failed, using in-memory storage:', error.message);
      console.log('Server will use in-memory storage as fallback');
    }
  } else {
    console.log('No MONGODB_URI provided, using in-memory storage');
  }
};

// Export in-memory storage for use when MongoDB is not available
const getInMemoryStorage = () => inMemoryStorage;

module.exports = connectDatabase;
module.exports.getInMemoryStorage = getInMemoryStorage;
