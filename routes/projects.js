const router = require('express').Router();

const { createProject, getProjects, deleteProjects, getProjectById } = require('../controllers/projects')
const authorize = require('../middlewares/auth');

router.post('/', authorize(["admin"]), createProject);
router.get('/:id', authorize(["admin", "user"]), getProjectById);
router.get('/', authorize(["admin", "user"]), getProjects);
router.delete('/:id', authorize(["admin"]), deleteProjects);

module.exports = router;