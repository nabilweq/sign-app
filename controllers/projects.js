const Project = require('../models/Project');
const User = require('../models/User');

module.exports.createProject = async (req, res, next) => {
    const user = await User.findById(req.body.userId);
    if (!user) {
        return res.status(400).json({ 
            success: false,
            message: 'User not found' 
        });
    }
    
    const newProject = new Project({
        userId: req.body.userId,
        represent: req.body.represent,
        payment: req.body.payment,
        discount: req.body.discount
    });

    await newProject.save();

    res.status(200).json({
        success: true,
        message: "Project created successfully",
        data: newProject
    })
};

module.exports.getProjects = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        data: await Project.find().populate('userId')
    })
};

module.exports.deleteProjects = async (req, res, next) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if(!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "project deleted successfully",
        data: {
            name: project.represent,
        }
    })
}