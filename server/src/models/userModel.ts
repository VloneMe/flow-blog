const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: [true, "Please enter Fullname!"]
    },
    email: {
        type: String,
        require: [true, "Please enter unique email!"],
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        require: [true, "Please enter Username!"]
    },
    password: {
        type: String,
        require: [true, "Please enter password to use!"]
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);