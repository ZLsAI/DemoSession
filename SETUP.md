# DemoSession Setup Guide

## Prerequisites
Before setting up the DemoSession project, ensure you have the following installed:

### Required Software
- **Node.js**: Version 14.x or higher (recommended: latest LTS version)
  - Check version: `node --version`
  - Download from: https://nodejs.org/
- **npm**: Comes with Node.js (version 6.x or higher)
  - Check version: `npm --version`
- **Git**: For version control
  - Check version: `git --version`
  - Download from: https://git-scm.com/

### Optional Tools
- **VS Code**: Recommended code editor with React extensions
- **Chrome/Firefox DevTools**: For debugging React applications

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ZLsAI/DemoSession.git
cd DemoSession
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React and React-DOM
- Webpack and webpack-dev-server
- Babel and necessary presets
- HTML webpack plugin

### 3. Verify Installation
Check that all dependencies are installed correctly:
```bash
npm list --depth=0
```

## Running the Application

### Development Mode
Start the development server with hot reloading:
```bash
npm start
```

- The application will be available at: `http://localhost:3000`
- The server watches for file changes and automatically reloads
- HMR (Hot Module Replacement) is enabled for React components

### Production Build
Create an optimized production build:
```bash
npm run build
```

- Output directory: `dist/`
- Includes minified and optimized bundles
- Ready for deployment to a web server

## Project Configuration

### Babel Configuration (.babelrc)
The project uses Babel to transpile modern JavaScript and JSX:
- `@babel/preset-env`: Transpiles ES6+ to browser-compatible JavaScript
- `@babel/preset-react`: Transforms JSX syntax

### Webpack Configuration (webpack.config.js)
Webpack is configured for:
- Entry point: `src/index.js`
- Output: `dist/bundle.js`
- Development server on port 3000
- HTML template injection
- Babel loader for .js files

## Development Workflow

### Making Changes
1. Edit files in the `src/` directory
2. Save your changes
3. Browser automatically reloads (if dev server is running)
4. Check console for errors or warnings

### Adding New Components
1. Create new `.js` file in `src/` directory
2. Import React: `import React from 'react';`
3. Define your component
4. Export the component: `export default ComponentName;`
5. Import and use in `App.js` or other components

### Adding Static Assets
- Place static files in the `public/` directory
- Reference them in your HTML or components

## Troubleshooting

### Common Issues

#### Port 3000 Already in Use
If port 3000 is occupied:
1. Stop the process using port 3000
2. Or modify `webpack.config.js` to use a different port

#### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors
```bash
# Clear webpack cache
rm -rf dist/
npm run build
```

#### Node Version Issues
If you encounter compatibility issues:
1. Check your Node.js version: `node --version`
2. Update to the latest LTS version if needed
3. Consider using nvm (Node Version Manager) for version management

### Getting Help
1. Check the console for specific error messages
2. Review the [React documentation](https://react.dev/)
3. Check the [Webpack documentation](https://webpack.js.org/)
4. Open an issue on the GitHub repository

## Environment Variables
Currently, the project doesn't use environment variables. If needed in the future:
1. Create a `.env` file in the root directory
2. Add variables: `REACT_APP_VARIABLE_NAME=value`
3. Access in code: `process.env.REACT_APP_VARIABLE_NAME`

## Testing
The project currently doesn't have a test setup. To add testing:
1. Install testing libraries: `npm install --save-dev jest @testing-library/react @testing-library/jest-dom`
2. Create test files with `.test.js` or `.spec.js` extension
3. Update `package.json` scripts to include test command

## Deployment

### Static Hosting
After building (`npm run build`), the `dist/` directory can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

### Basic Deployment Steps
1. Run `npm run build`
2. Upload contents of `dist/` directory to your hosting service
3. Configure server to serve `index.html` for all routes (if using routing)

## Next Steps
After successful setup:
1. Review the code in `src/` directory
2. Read `PROJECT_SCOPE.md` to understand project objectives
3. Check `TASKS.md` for current and planned tasks
4. Start building your React application!

## Additional Resources
- [React Getting Started](https://react.dev/learn)
- [Webpack Configuration](https://webpack.js.org/configuration/)
- [Babel Documentation](https://babeljs.io/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
