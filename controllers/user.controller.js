const User = require('../models/User');

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
            const {body} = req;

            const createdUser = await User.create(body);

            res.json(createdUser);
        } catch (err) {
            res.json(err.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {body, params: {userId}} = req;

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

            const deletedUser = await User.findByIdAndDelete(userId);

            res.json(deletedUser);
        } catch (err) {
            res.json(err.message);
        }
    }
};
