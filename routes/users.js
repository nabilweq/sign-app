const router = require('express').Router();

const { addUser, getMembers, deleteMember } = require('../controllers/users');
const authorize = require('../middlewares/auth');

router.post('/', authorize(["admin"]), addUser); 
router.get('/', authorize(["admin"]), getMembers); 
router.delete('/:id', authorize(["admin"]), deleteMember);

module.exports = router;