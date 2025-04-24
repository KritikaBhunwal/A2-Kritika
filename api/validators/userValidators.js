const { body } = require('express-validator');

/**
 * Validation rules for sign-up.
 */
exports.signUpRules = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
];

/**
 * Validation rules for sign-in.
 */
exports.signInRules = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];
