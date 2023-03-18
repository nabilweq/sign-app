const mongoose = require('mongoose');

const Project = mongoose.Schema({
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