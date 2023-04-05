const mongoose = require('mongoose');

const User = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    signLink: {
        type: String,
    },
    otp: {
        type: Number
    },
    otpExpires: {
        type: Date
    }
})

module.exports = mongoose.model('user', User)