const router = require('express').Router();

const { addUser, getMembers, deleteMember, editMember } = require('../controllers/users');
const authorize = require('../middlewares/auth');

router.post('/', authorize(["admin"]), addUser); 
router.get('/', authorize(["admin", "superadmin"]), getMembers); 
router.put('/:userId', authorize(["admin"]), editMember);
router.delete('/:userId', authorize(["admin"]), deleteMember);

module.exports = router;