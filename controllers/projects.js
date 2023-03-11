const Project = require('../models/Project');
const User = require('../models/User');

const getCurrentDate = require('../utils/date');

module.exports.createProject = async (req, res) => {
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
        discount: req.body.discount,
        createdOn: await getCurrentDate()
    });

    await newProject.save();

    res.status(200).json({
        success: true,
        message: "Project created successfully",
        data: newProject
    })
};

module.exports.getProjects = async (req, res) => {
    let projects;
    if( req.user.type === 'admin' ) {
        projects = await Project.find().populate('userId');
    } else {
        projects = await Project.find({ userId: req.user.id }).select(["-signUrl", "-agreementUrl"]).populate('userId');
    }
    res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        projects
    })
};

module.exports.getProjectById = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Project fetched successfully",
        project: await Project.findById(req.params.id).populate('userId')
    })
}

module.exports.deleteProjects = async (req, res) => {
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