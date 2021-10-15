const User = require('../models/User');
const passwordService = require('../services/password.service');
const {errorMessages, errorStatuses} = require('../constants');

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
