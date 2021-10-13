const User = require('../models/User');
const {authValidator} = require('../validators');
const passwordService = require('../services/password.service');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {body} = req;

            const {error} = authValidator.validate(body);

            if (error) {
                next({
                    message: 'Wrong email or password!!!',
                    status: 404
                });

                return;
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const foundUser = await User.findOne({email})
                .select('+password')
                .lean();

            if (!foundUser) {
                next({
                    message: 'Wrong email or password!!!',
                    status: 404
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
                next({
                    message: 'Access denied',
                    status: 401
                });

                return;
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
