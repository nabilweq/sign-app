const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/admins', require('./admin'));
router.use('/users', require('./users'));
router.use('/projects', require('./projects'));

module.exports = router;