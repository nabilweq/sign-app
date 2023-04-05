const router = require('express').Router();
const multer = require('multer');

const { createAdmin, getAdmins, editAdmin, deleteAdmin } = require('../controllers/admin')
const authorize = require('../middlewares/auth');

const upload = multer()

router.post('/', authorize(["superadmin"]), upload.array('sign'), createAdmin); 
router.get('/', authorize(["superadmin"]), getAdmins);
router.put('/:adminId', authorize(["superadmin"]), upload.array('sign'), editAdmin);
router.delete('/:adminId', authorize(["superadmin"]), deleteAdmin);

module.exports = router;