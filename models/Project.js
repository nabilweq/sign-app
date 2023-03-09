const mongoose = require('mongoose');

const Project = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    represent: {
        type: String,
        required: true,
    },
    payment: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
    }
})

module.exports = mongoose.model('project', Project);