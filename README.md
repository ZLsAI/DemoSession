# DemoSession

A simple React application demonstrating basic setup with webpack and babel.

## 📚 Documentation
- **[PROJECT_SCOPE.md](PROJECT_SCOPE.md)** - Project objectives, scope, and architecture
- **[SETUP.md](SETUP.md)** - Detailed setup and installation instructions
- **[TASKS.md](TASKS.md)** - Task tracking and project roadmap

## Features
- React 19.x
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
```bash
npm start
```
The app will open in your browser at `http://localhost:3000`

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
│   ├── index.js     # Entry point
│   └── test-route.js # Test route handler
├── .babelrc         # Babel configuration
├── webpack.config.js # Webpack configuration
├── package.json     # Dependencies and scripts
├── PROJECT_SCOPE.md # Project scope and objectives
├── SETUP.md         # Setup instructions
└── TASKS.md         # Task tracking
```

## API Routes

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
