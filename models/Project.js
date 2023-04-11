const mongoose = require('mongoose');

const Project = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    agreementType: {
        type: String,
        required: true,
        enum: [ 'service', 'pharmacy', 'diagnostics', 'pet-clinic', 'ayurveda-clinic']
    },
    createdOn: {
        type: Date,
    },
    // signUrl: {
    //     type: String,
    // },
    // agreementUrl: {
    //     type: String,
    // },
    otpVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number
    },
    otpExpires: {
        type: Date
    }
})

module.exports = mongoose.model('project', Project);