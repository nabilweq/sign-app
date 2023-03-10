const router = require('express').Router();

const { adminSignin, signin, submitOtp } = require('../controllers/auth');

router.post('/login/admin', adminSignin);
router.post('/submit-otp', submitOtp);
router.post('/login', signin);

module.exports = router;