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
    represent: {
        type: String,
        required: true,
    },
    payment: {
        type: Number,
        required: true
    },
    agreementType: {
        type: String,
        required: true,
        enum: [ 'Service', 'Pharmacy']
    },
    discount: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
    },
    signUrl: {
        type: String,
    },
    agreementUrl: {
        type: String,
    }
})

module.exports = mongoose.model('project', Project);