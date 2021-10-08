const User = require('../models/User');

module.exports = {
    getUsers: (req, res) => {
        try {
            res.json(req.foundUsers);

        } catch (err) {
            res.json(err.message);
        }
    },

    getUserById: (req, res) => {
        try {
            res.json(req.foundUser);

        } catch (err) {
            res.json(err.message);
        }
    },

    createUser: (req, res) => {
        try {
            res.json(req.createdUser);

        } catch (err) {
            res.json(err.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findById(req.params.userId);

            res.json(updatedUser);

        } catch (err) {
            res.json(err.message);
        }
    },

    deleteUser: (req, res) => {
        try {
            res.json(`User with id: ${req.params.userId} was deleted`);

        } catch (err) {
            res.json(err.message);
        }
    }
};
