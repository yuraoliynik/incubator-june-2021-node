const {model, Schema} = require('mongoose');

const {modelNames, userStatuses, userRoles} = require('../constants');
const passwordService = require('../services/password.service');
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
        type: Number,
        default: 0
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

userSchema.pre('findOne', function() {
    this.lean();
});

userSchema.pre('find', function() {
    this.lean();
});

userSchema.pre('deleteOne', function() {
    this.lean();
});

userSchema.pre('deleteMany', function() {
    this.lean();
});

module.exports = userSchema.statics = {
    activate(userId) {
        return this.updateOne(
            {_id: userId},
            {status: userStatuses.ACTIVE}
        ).lean();
    },

    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({
            ...userObject,
            password: hashedPassword
        });
    },

    normalize(userObjectToNormalize) {
        return userUtil.userNormalizator(userObjectToNormalize);
    },

    updateData(userId, userDataObject) {
        return this.findByIdAndUpdate(
            userId,
            userDataObject,
            {new: true, runValidators: true}
        ).lean();
    },

    async updatePassword(userId, newPassword) {
        const hashedPassword = await passwordService.hash(newPassword);

        return this.updateOne(
            {_id: userId},
            {password: hashedPassword}
        ).lean();
    }
};

module.exports = model(modelNames.USER, userSchema);
