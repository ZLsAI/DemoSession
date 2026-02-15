require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase, disconnectDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

// Connect to database
connectDatabase().then((dbConfig) => {
  app.locals.useInMemory = dbConfig.useInMemory;
  app.locals.inMemoryStore = dbConfig.inMemoryStore;
}).catch((error) => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

// API Routes
const appointmentsRouter = require('./routes/appointments');
app.use('/api/appointments', appointmentsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: app.locals.useInMemory ? 'in-memory' : 'mongodb'
  });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.path}`
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Appointments endpoint: http://localhost:${PORT}/api/appointments`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
});

module.exports = app;
