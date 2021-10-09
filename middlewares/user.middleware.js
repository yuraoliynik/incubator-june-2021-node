const User = require('../models/User');

module.exports = {
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
