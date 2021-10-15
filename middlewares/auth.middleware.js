const {errorMessages, errorStatuses} = require('../constants');
const passwordService = require('../services/password.service');
const User = require('../models/User');

module.exports = {
    isEmailExist: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const foundUser = await User.findOne({email})
                .select('+password')
                .lean();

            if (!foundUser) {
                next({
                    message: errorMessages.WRONG_EMAIL_OR_PASSWORD,
                    status: errorStatuses['400']
                });

                return;
            }

            req.foundUser = foundUser;

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserRolesChecked: (roles = []) => (req, res, next) => {
        try {
            const {foundUser: {role}} = req;

            if (!roles.includes(role)) {
                return next({
                    message: errorMessages.ACCESS_DENIED,
                    status: errorStatuses['401']
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isPasswordMatched: async (req, res, next) => {
        try {
            const {body, foundUser} = req;

            await passwordService.compare(body.password, foundUser.password);

            next();
        } catch (err) {
            next(err);
        }
    }
};
