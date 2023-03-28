const router = require('express').Router();
const multer = require('multer');

const { createProject, getProjects, deleteProjects, getProjectById, uploadSign, editProject } = require('../controllers/projects')
const authorize = require('../middlewares/auth');

const upload = multer()

router.post('/', authorize(["admin"]), createProject);
router.get('/:id', authorize(["admin", "user"]), getProjectById);
router.put('/:projectId', authorize(["admin"]), editProject);
router.get('/', authorize(["admin", "user"]), getProjects);
router.delete('/:id', authorize(["admin"]), deleteProjects);
router.post('/upload-sign/:id', authorize(["user"]), upload.array('sign'), uploadSign);

module.exports = router;