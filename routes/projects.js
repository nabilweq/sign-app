const router = require('express').Router();

const { createProject, getProjects, deleteProjects } = require('../controllers/projects')
const { roleEnum } = require('../utils/common');
const authorize = require('../middlewares/auth');

router.post('/',  createProject); //authorize(roleEnum.admin),
router.get('/',  getProjects); //authorize(roleEnum.admin),
router.delete('/:id',  deleteProjects); //authorize(roleEnum.admin),

module.exports = router;