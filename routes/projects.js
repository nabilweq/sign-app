const router = require('express').Router();

const { createProject, getProjects, deleteProjects } = require('../controllers/projects')
const authorize = require('../middlewares/auth');

router.post('/', authorize(["admin"]), createProject);
router.get('/', authorize(["admin", "user"]), getProjects);
router.delete('/:id', authorize(["admin"]), deleteProjects);

module.exports = router;