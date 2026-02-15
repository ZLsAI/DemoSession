const mongoose = require('mongoose');
const InMemoryAppointmentStore = require('../utils/inMemoryStore');

let inMemoryStore = null;

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
  
  if (!mongoUri) {
    console.log('⚠️  MongoDB URI not provided. Using in-memory storage.');
    console.log('   Data will be lost when server stops.');
    console.log('   Set MONGODB_URI or MONGO_URL environment variable to use MongoDB.');
    
    // Initialize in-memory store
    inMemoryStore = new InMemoryAppointmentStore();
    
    return { useInMemory: true, inMemoryStore };
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
    return { useInMemory: false, inMemoryStore: null };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('⚠️  Falling back to in-memory storage');
    
    // Initialize in-memory store as fallback
    inMemoryStore = new InMemoryAppointmentStore();
    
    return { useInMemory: true, inMemoryStore };
  }
};

// Cleanup function for graceful shutdown
const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (inMemoryStore) {
    console.log('In-memory storage cleared');
  }
};

module.exports = { connectDatabase, disconnectDatabase };
