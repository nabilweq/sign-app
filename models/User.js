const mongoose = require('mongoose');

const User = mongoose.Schema({
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
    otp: {
        type: Number
    },
    otpExpires: {
        type: Date
    }
})

module.exports = mongoose.model('user', User)