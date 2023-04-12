const router = require('express').Router();

const { superAdminSignin, userSignin, adminSignin, submitOtp } = require('../controllers/auth');

router.post('/login/superadmin', superAdminSignin);
router.post('/submit-otp', submitOtp);
router.post('/login/user', userSignin);
router.post('/login/admin', adminSignin);

module.exports = router;