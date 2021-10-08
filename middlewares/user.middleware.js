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

    createUser: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new Error(`User whit email: ${email} exists`);
            }

            next();

        } catch (err) {
            res.json(err.message);
        }
    },

    userExists: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const foundUser = await User.findById(userId);

            if (!foundUser) {
                throw new Error(`User id: ${userId} is not exist`);
            }

            req.foundUser = foundUser;

            next();

        } catch (err) {
            res.json(err.message);
        }
    }
};
