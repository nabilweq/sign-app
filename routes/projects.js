const router = require('express').Router();
const multer = require('multer');

const { createProject, getProjects, deleteProjects, getProjectById, uploadSign, editProject, generateOtp, verifyOtp } = require('../controllers/projects')
const authorize = require('../middlewares/auth');

const upload = multer()

router.post('/', authorize(["admin"]), createProject);
router.get('/:projectId', authorize(["superadmin", "admin", "user"]), getProjectById);
router.put('/:projectId', authorize(["admin"]), editProject);
router.get('/', authorize(["superadmin", "admin", "user"]), getProjects);
router.delete('/:projectId', authorize(["admin"]), deleteProjects);
// router.post('/upload-sign/:projectId', authorize(["user"]), upload.array('sign'), uploadSign);
router.post('/get-otp/:projectId', authorize(["user"]), generateOtp);
router.post('/verify-otp', authorize(["user"]), verifyOtp)

module.exports = router;