const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/register', authController.registerUser);
router.post('/verify-email', authController.verifyEmail);
router.post('/admin-login', authController.adminLogin);

module.exports = router;
