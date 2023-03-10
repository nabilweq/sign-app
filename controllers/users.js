const User = require('../models/User');

const libphonenumberJs = require("libphonenumber-js");

const errorWrapper = require('../middlewares/errorWrapper');

module.exports.addUser = errorWrapper(async (req, res) => {
    const user = await User.findOne({ phone: req.body.phone });
    if (user) {
        return res.status(400).json({ 
            success: false,
            message: 'Member already exists with this phone number' 
        });
    }

    const phoneNumber = libphonenumberJs.parsePhoneNumberFromString(req.body.phone.toString(), 'IN');
    if(!phoneNumber.isValid()) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid phone numberr' 
        });
    }

    const newUser = new User({
        name: req.body.name,
        phone: phoneNumber.number,
        address: req.body.address
    });

    await newUser.save();

    res.status(200).json({
        success: true,
        message: "User added successfully",
        data: newUser
    })
});

module.exports.getMembers = errorWrapper(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Members fetched successfully",
        data: await User.find()
    })
});

module.exports.deleteMember = errorWrapper(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: {
            name: user.name,
            phone: user.phone
        }
    })
})