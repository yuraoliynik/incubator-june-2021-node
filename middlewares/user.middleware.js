const User = require('../models/User');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const foundUsers = await User.find({});

            if (!foundUsers.length) {
                throw new Error('No registered users');
            }

            req.foundUsers = foundUsers;

            next();

        } catch (err) {
            res.json(err.message);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const foundUser = await User.findById(req.params.userId);

            if (!foundUser) {
                throw new Error(`User id: ${req.params.userId} is not exist`);
            }

            req.foundUser = foundUser;

            next();

        } catch (err) {
            res.json(err.message);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const userEmail = await User.findOne({email: req.body.email});

            if (userEmail) {
                throw new Error(`User whit email: ${req.body.email} exists`);
            }

            req.createdUser = await User.create(req.body);

            next();

        } catch (err) {
            res.json(err.message);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                req.body
            );

            if (!updatedUser) {
                throw new Error(`User whit id: ${req.params.userId} is not exist`);
            }

            next();

        } catch (err) {
            res.json(err.message);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);

            if (!deletedUser) {
                throw new Error(`User whit id: ${req.params.userId} is not exist`);
            }

            next();

        } catch (err) {
            res.json(err.message);
        }
    }
};
