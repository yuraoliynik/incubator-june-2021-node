const User = require('../models/User');
const {userPutValidator, userValidator} = require('../validators');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const {body} = req;

            const {error} = userValidator.validate(body);

            if (error) {
                next({
                    message: error.details[0].message,
                    status: 400
                });

                return;
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserPutValid: (req, res, next) => {
        try {
            const {body} = req;

            const {error} = userPutValidator.validateAsync(body);

            if (error) {
                next({
                    message: error.details[0].message,
                    status: 400
                });

                return;
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const foundUser = await User.findById(userId);

            if (!foundUser) {
                next({
                    message: `User with id: ${userId} doesn't exist`,
                    status: 400
                });

                return;
            }

            req.foundUser = foundUser;

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserEmailExist: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                next({
                    message: `User whit email: ${email} exists`,
                    status: 400
                });

                return;
            }

            next();
        } catch (err) {
            next(err);
        }
    }
};
