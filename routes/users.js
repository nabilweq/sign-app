const router = require('express').Router();

const { addUser, getMembers, deleteMember } = require('../controllers/users');
const { roleEnum } = require('../utils/common');
const authorize = require('../middlewares/auth');

router.post('/',  addUser); //authorize(roleEnum.admin),
router.get('/',  getMembers); //authorize(roleEnum.admin),
router.delete('/:id',  deleteMember); //authorize(roleEnum.admin),

module.exports = router;