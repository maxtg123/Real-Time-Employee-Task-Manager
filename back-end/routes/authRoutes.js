const express = require('express');
const router = express.Router();
const {
  sendAccessCode,
  verifyAccessCode, 
} = require('../controllers/authController');

router.post('/send-access-code', sendAccessCode);
router.post('/verify-access-code', verifyAccessCode); 

module.exports = router;
