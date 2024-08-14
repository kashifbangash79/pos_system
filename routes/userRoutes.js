const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getUserProfile, logoutUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

// User login
router.post('/login', loginUser);

// User registration (for initial setup, then comment out or remove)
router.post('/register', registerUser);

// Get current user profile
router.get('/me', auth, getUserProfile);

// Logout user
router.post('/logout', auth, logoutUser);

module.exports = router;
