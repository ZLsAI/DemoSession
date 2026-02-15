# DemoSession

A full-stack application with React frontend and Express backend API.

## Features
- React 19.x frontend
- Express.js backend API
- Contact form with server-side validation
- CORS enabled for cross-origin requests
- Request logging and error handling
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

### Environment Configuration
Create a `.env` file in the root directory (optional):
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

See `.env.example` for all available options.

### Running the App

**Frontend:**
```bash
npm start
```
The app will open in your browser at `http://localhost:3000`

**Backend API Server:**
```bash
npm run server
```
The API server will run at `http://localhost:5000`

**Development Mode (Both):**
```bash
npm run dev
```
Runs the backend server with auto-reload on changes.

### Building for Production
```bash
npm run build
```
The production build will be created in the `dist` directory.

## Project Structure
```
DemoSession/
├── public/          # Static files
│   └── index.html   # HTML template
├── src/             # React source files
│   ├── App.js       # Main App component
│   └── index.js     # Entry point
├── server/          # Backend API server
│   ├── index.js     # Express server entry point
│   └── routes/      # API route handlers
│       └── contact.js # Contact form endpoint
├── .babelrc         # Babel configuration
├── webpack.config.js # Webpack configuration
└── package.json     # Dependencies and scripts
```

## API Routes

### POST /api/contact
Submit a contact form with validation.

**Endpoint:** `POST http://localhost:5000/api/contact`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message."
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `message`: Required, 10-1000 characters

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

**Validation Error Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    },
    {
      "field": "message",
      "message": "Message must be between 10 and 1000 characters"
    }
  ]
}
```

**Server Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "An error occurred processing your request"
}
```

**Example with curl:**
```bash
# Valid request
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Hello, this is a test message."}'

# Invalid email
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"invalid-email","message":"Test message here"}'
```

### GET /health
Health check endpoint to verify server status.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-02-15T17:19:47.203Z"
}
```

### GET /test
Returns a JSON response with a greeting message.

**Response:**
```json
{
    "message": "Hello from test route",
    "timestamp": "2026-01-17T16:30:00.000Z",
    "source": "Azure Session Pool",
    "status": "success"
}
```

### POST /test
Echoes back the request body.

**Request Body:** Any JSON object
**Response:** The received data plus metadata

---
*Route created via Azure Session Pool on 2026-01-17*
