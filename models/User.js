const {Schema, model} =require('mongoose');

const userRoles = require("../constants/userRoles");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minlength: 4
    },

    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true, versionKey: false});

module.exports = model('User', userSchema);
