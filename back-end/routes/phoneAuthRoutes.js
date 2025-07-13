const express = require('express');
const router = express.Router();
const { sendPhoneCode, verifyPhoneCode } = require('../controllers/phoneAuthController');

router.post('/send-phone-code', sendPhoneCode);
router.post('/verify-phone-code', verifyPhoneCode);

module.exports = router;
