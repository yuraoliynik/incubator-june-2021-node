const User = require('../models/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const foundUsers = await User.find({});

            res.json(foundUsers);
        } catch (err) {
            res.json(err.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const {foundUser} = req;

            res.json(foundUser);
        } catch (err) {
            res.json(err.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const {body, body: {password}} = req;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({...body, password: hashedPassword});

            const normUser = userUtil.userNormalizator(createdUser.toObject());

            res.json(normUser);
        } catch (err) {
            res.json(err.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {params: {userId}, body} = req;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                body,
                {new: true, runValidators: true}
            );

            res.json(updatedUser);
        } catch (err) {
            res.json(err.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {params: {userId}} = req;

            const deletedUser = await User.findByIdAndDelete(userId).select('-password');

            res.json(deletedUser);
        } catch (err) {
            res.json(err.message);
        }
    }
};
