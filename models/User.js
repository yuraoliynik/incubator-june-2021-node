const {model, Schema} = require('mongoose');

const {modelNames, userStatuses, userRoles} = require('../constants');
const {passwordService} = require('../services');
const userUtil = require('../util/user.util');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    secondName: {
        type: String,
        default: '',
        trim: true
    },

    age: {
        type: Number
    },

    status: {
        type: String,
        required: true,
        enum: Object.values(userStatuses),
        default: userStatuses.NOT_ACTIVE
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
        required: true,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

userSchema.virtual('fullName').get(function() {
    if (!this.secondName) {
        return `${this.name}`;
    }

    return `${this.name} ${this.secondName}`;
});

userSchema.methods = {
    normalize() {
        return userUtil.userNormalizator(this.toObject());
    }
};

module.exports = userSchema.statics = {
    activate(userId) {
        return this.updateOne(
            {_id: userId},
            {status: userStatuses.ACTIVE}
        );
    },

    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({
            ...userObject,
            password: hashedPassword
        });
    },

    async updatePassword(userId, newPassword) {
        const hashedPassword = await passwordService.hash(newPassword);

        return this.updateOne(
            {_id: userId},
            {password: hashedPassword}
        );
    }
};

module.exports = model(modelNames.USER, userSchema);
