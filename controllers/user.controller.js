const {User} = require('../models');
const userUtil = require('../util/user.util');
const {passwordService} = require('../services');
const {errorStatuses} = require('../constants');

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

            res
                .status(errorStatuses['201'])
                .json(normedUser);
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

            res
                .status(errorStatuses['201'])
                .json(updatedUser);
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            await User.findByIdAndDelete(userId).select('-password');

            res.sendStatus(errorStatuses['204']);
        } catch (err) {
            next(err);
        }
    }
};
