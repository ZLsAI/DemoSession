/**
 * Contact form API route
 * Handles POST requests to /api/contact with validation
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

/**
 * POST /api/contact
 * Accepts contact form submissions with validation
 * 
 * Request body:
 * - name: string (2-100 characters)
 * - email: string (valid email format)
 * - message: string (10-1000 characters)
 * 
 * Response:
 * - 200: Success with confirmation message
 * - 400: Validation errors
 * - 500: Server error
 */
router.post(
  '/',
  [
    // Validate name
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    
    // Validate email
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Valid email is required')
      .normalizeEmail(),
    
    // Validate message
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        // Format errors for response
        const formattedErrors = errors.array().map(error => ({
          field: error.path,
          message: error.msg
        }));
        
        console.log('Contact form validation failed:', {
          errors: formattedErrors,
          timestamp: new Date().toISOString()
        });
        
        return res.status(400).json({
          success: false,
          errors: formattedErrors
        });
      }
      
      const { name, email, message } = req.body;
      
      // Log successful submission (without sensitive data)
      console.log('Contact form submitted successfully:', {
        timestamp: new Date().toISOString(),
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message
      });
      
      // TODO: Future enhancements:
      // - Send email notification
      // - Save to database
      // - Send auto-reply to user
      
      // Return success response
      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully'
      });
    } catch (error) {
      // Log error without exposing internal details
      console.error('Contact form error:', {
        message: error.message,
        timestamp: new Date().toISOString()
      });
      
      res.status(500).json({
        success: false,
        message: 'An error occurred processing your request'
      });
    }
  }
);

module.exports = router;
