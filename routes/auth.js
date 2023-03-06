const router = require('express').Router();

const { adminSignin, signin } = require('../controllers/auth');

router.post('/login/admin', adminSignin);
router.post('/login', signin);

module.exports = router;