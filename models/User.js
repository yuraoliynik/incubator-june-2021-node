const {model, Schema} = require('mongoose');

const {modelNames, userRoles} = require('../constants');

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
        minlength: 8,
        select: false
    },

    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true, versionKey: false});

module.exports = model(modelNames.USER, userSchema);
