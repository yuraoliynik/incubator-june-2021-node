const {errorMessages, errorStatuses} = require('../constants');
const {User} = require('../models');

module.exports = {
    isUserExist: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const foundUser = await User.findById(userId);

            if (!foundUser) {
                return next({
                    message: errorMessages.USER_ID_DOESNT_EXIST,
                    status: errorStatuses.status_404
                });
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
                return next({
                    message: errorMessages.USER_EMAIL_ALREADY_EXISTS,
                    status: errorStatuses.status_409
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    }
};
