const User = require('../models/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const foundUsers = await User.find({});

            res.json(foundUsers);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {foundUser} = req;

            res.json(foundUser);
        } catch (err) {
            next(err);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {body, body: {password}} = req;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({...body, password: hashedPassword});

            const normedUser = userUtil.userNormalizator(createdUser.toObject());

            res.json(normedUser);
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {params: {userId}, body} = req;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                body,
                {new: true, runValidators: true}
            );

            res.json(updatedUser);
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const deletedUser = await User.findByIdAndDelete(userId).select('-password');

            res.json(deletedUser);
        } catch (err) {
            next(err);
        }
    }
};
