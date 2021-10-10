const User = require('../models/User');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const foundUser = await User.findOne({email});

            if (foundUser) {
                throw new Error(`User with email: ${email} already exists`);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    userExist: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const foundUser = await User.findById(userId);

            if (!foundUser) {
                throw new Error(`User with id: ${userId} already exists`);
            }

            req.foundUser = foundUser;

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
