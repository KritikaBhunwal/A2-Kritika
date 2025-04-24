const router = require('express').Router();
const { signUp, signIn } = require('../controllers/authController');
const { signUpRules, signInRules } = require('../validators/userValidators');

// Registration & login endpoints
router.post('/', signUpRules, signUp);
router.post('/sign-in', signInRules, signIn);

module.exports = router;
// This code defines an Express router for user authentication. It includes routes for user registration and login, applying validation rules to the request body using express-validator. The signUp and signIn functions are imported from a controller module to handle the respective requests. The router is then exported for use in the main application.