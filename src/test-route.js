/**
 * Demo /test route - Created via Azure Session Pool
 * This file demonstrates the /test endpoint
 */

const express = require('express');
const router = express.Router();

/**
 * GET /test
 * Returns a JSON response with a greeting message
 */
router.get('/test', (req, res) => {
    res.json({
        message: 'Hello from test route',
        timestamp: new Date().toISOString(),
        source: 'Azure Session Pool',
        session: 'create-route-1768667510',
        status: 'success'
    });
});

/**
 * POST /test
 * Echoes back the request body
 */
router.post('/test', (req, res) => {
    res.json({
        message: 'Hello from test route (POST)',
        receivedData: req.body,
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

module.exports = router;
