# DemoSession

A full-stack React application with Express backend for patient records management.

## Features
- React 19.x frontend
- Express.js backend with RESTful API
- MongoDB/Mongoose with in-memory fallback
- Patient records CRUD operations
- Webpack for bundling
- Babel for JSX transpilation
- Development server with hot reloading

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
npm install
```

### Running the App

#### Frontend Only
```bash
npm start
```
The app will open in your browser at `http://localhost:3000`

#### Backend Only
```bash
npm run server
```
The backend server will start at `http://localhost:5000`

#### Both Frontend and Backend
```bash
npm run dev
```
This will start both the frontend (port 3000) and backend (port 5000) servers.

### Building for Production
```bash
npm run build
```
The production build will be created in the `dist` directory.

## Project Structure
```
DemoSession/
├── public/              # Static files
│   └── index.html       # HTML template
├── src/                 # React source files
│   ├── App.js           # Main App component
│   └── index.js         # Entry point
├── server/              # Backend server
│   ├── config/          # Configuration files
│   │   └── database.js  # MongoDB connection setup
│   ├── models/          # Data models
│   │   └── Patient.js   # Patient model/schema
│   ├── routes/          # API routes
│   │   └── patients.js  # Patient CRUD endpoints
│   ├── utils/           # Utility functions
│   │   └── validation.js # Input validation helpers
│   └── index.js         # Express server setup
├── .babelrc             # Babel configuration
├── .env.example         # Environment variables template
├── webpack.config.js    # Webpack configuration
└── package.json         # Dependencies and scripts
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
PORT=5000                     # Backend server port
NODE_ENV=development          # Environment mode
MONGODB_URI=                  # MongoDB connection string (optional)
FRONTEND_URL=http://localhost:3000  # Frontend URL for CORS
```

**Note:** If `MONGODB_URI` is not provided, the server will use in-memory storage.

## API Routes

### Health Check

#### GET /api/health
Returns server health status.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-02-15T14:08:42.751Z"
}
```

### Patient Management

#### POST /api/patients
Create a new patient record.

**Required Fields:**
- `firstName` (string)
- `lastName` (string)
- `dateOfBirth` (date, must be in the past)
- `contactNumber` (string)

**Optional Fields:**
- `gender` (string: 'Male', 'Female', 'Other')
- `email` (string, validated format)
- `address` (string)
- `bloodType` (string: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
- `allergies` (array of strings)
- `medicalHistory` (string)
- `assignedDoctor` (string)
- `emergencyContact` (object with name, relationship, phoneNumber)

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-05-15",
  "gender": "Male",
  "contactNumber": "555-0123",
  "email": "john.doe@example.com",
  "bloodType": "O+",
  "allergies": ["Penicillin"],
  "assignedDoctor": "Dr. Smith"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Patient created successfully",
  "data": { /* patient object */ }
}
```

#### GET /api/patients
Get all patients with optional search.

**Query Parameters:**
- `search` (optional): Search by firstName, lastName, or contactNumber

**Example:**
```
GET /api/patients?search=John
```

**Response:**
```json
{
  "success": true,
  "message": "Patients retrieved successfully",
  "data": [ /* array of patient objects */ ]
}
```

#### GET /api/patients/:id
Get a single patient by ID.

**Response:**
```json
{
  "success": true,
  "message": "Patient retrieved successfully",
  "data": { /* patient object */ }
}
```

#### PUT /api/patients/:id
Update an existing patient record.

**Request:** Same fields as POST (all optional for updates)

**Response:**
```json
{
  "success": true,
  "message": "Patient updated successfully",
  "data": { /* updated patient object */ }
}
```

#### DELETE /api/patients/:id
Soft delete a patient record (marks as deleted, doesn't remove from database).

**Response:**
```json
{
  "success": true,
  "message": "Patient deleted successfully",
  "data": { "id": "patient-id" }
}
```

### Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error description"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Validation error
- `404` - Not found
- `500` - Server error

---
