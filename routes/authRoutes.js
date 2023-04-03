const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboard');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/dashboard', authMiddleware, dashboardController.dashboard);

module.exports = router;
