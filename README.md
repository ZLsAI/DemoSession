# DemoSession

A full-stack hospital management system with React frontend and Express.js backend.

## Features
- React 19.x frontend
- Express.js backend server
- MongoDB database with in-memory fallback
- Webpack for bundling
- Babel for JSX transpilation
- Development server with hot reloading
- CORS configured for local development

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
npm install
```

### Environment Setup
1. Copy the environment template:
```bash
cp .env.example .env
```
2. Update `.env` with your configuration (MongoDB URI, port, etc.)

### Running the Application

#### Frontend Only
```bash
npm start
```
The app will open in your browser at `http://localhost:3000`

#### Backend Only
```bash
npm run server
```
The backend server will run on `http://localhost:5000`

#### Both Frontend and Backend
```bash
npm run dev
```
Runs both frontend and backend concurrently

#### Production Build
```bash
npm run build
npm run start:server
```
The production build will be created in the `dist` directory.

## Project Structure
```
DemoSession/
├── public/                # Static files
│   └── index.html         # HTML template
├── src/                   # React source files
│   ├── App.js             # Main App component
│   └── index.js           # Entry point
├── server/                # Backend server
│   ├── index.js           # Express server entry point
│   ├── config/            # Configuration files
│   │   └── database.js    # Database connection setup
│   ├── middleware/        # Custom middleware
│   │   └── errorHandler.js # Error handling middleware
│   ├── models/            # Database models (to be added)
│   └── routes/            # API routes (to be added)
├── .babelrc               # Babel configuration
├── .env.example           # Environment variables template
├── webpack.config.js      # Webpack configuration
└── package.json           # Dependencies and scripts
```

## Backend API

### Health Check
**GET** `/api/health`

Returns the server health status.

**Response:**
```json
{
  "status": "ok"
}
```

## Configuration

### Environment Variables
- `PORT` - Backend server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)
- `MONGODB_URI` - MongoDB connection string (optional, falls back to in-memory storage)

### Database
The backend supports MongoDB but will gracefully fall back to in-memory storage if MongoDB is not available. This allows development without requiring a MongoDB installation.

## Notes
- Frontend runs on port 3000 (configurable in webpack.config.js)
- Backend runs on port 5000 (configurable via PORT environment variable)
- CORS is configured to allow requests from localhost:3000 (configurable via FRONTEND_URL environment variable)
