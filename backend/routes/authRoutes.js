const express = require('express');
const router = express.Router();
const authController1 = require('../controller/SignUpController');
const authController2 = require('../controller/SignInController');

// Sign-up route
router.post('/signup', authController1.signUp);

// Sign-in route
router.post('/login', authController2.signIn);

module.exports = router;
