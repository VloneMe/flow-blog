const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
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