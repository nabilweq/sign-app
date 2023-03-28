const Project = require('../models/Project');
const User = require('../models/User');

const uploadFiles = require('../functions/uploadFile');
const createAgreement = require('../functions/createAgreement');
const getCurrentDate = require('../utils/date');

const errorWrapper = require('../middlewares/errorWrapper');

module.exports.createProject = errorWrapper(async (req, res) => {
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
        agreementType: req.body.agreementType,
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
});

module.exports.getProjects = errorWrapper(async (req, res) => {
    let projects;
    if( req.user.type === 'admin' ) {
        projects = await Project.find().populate('userId');
    } else {
        projects = await Project.find({ userId: req.user.id }).populate('userId');
    }
    res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        projects
    })
});

module.exports.getProjectById = errorWrapper(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Project fetched successfully",
        project: await Project.findById(req.params.id).populate('userId')
    })
});

module.exports.editProject = errorWrapper(async (req, res) => {
    const project = await Project.findOne({_id: req.params.projectId, signUrl: null });
    if(!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found or already signed"
        });
    }

    project.userId = req.body.userId
    project.represent = req.body.represent
    project.agreementType = req.body.agreementType
    project.payment = req.body.payment
    project.discount = req.body.discount

    await project.save();

    res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: project
    })
});

module.exports.deleteProjects = errorWrapper(async (req, res) => {
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
})

module.exports.uploadSign = errorWrapper(async (req, res) => {

    const project = await Project.findOne({ userId: req.user.id, _id: req.params.id, signUrl: { $exists:false } }).populate('userId');
    if(!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    }

    project.signUrl = await uploadFiles(req.files);
    project.agreementUrl =  await createAgreement(project);
    await project.save();
   
    res.status(200).json({
        success: true,
        message: "sign uploaded and agreement created successfully",
        project
    })
})