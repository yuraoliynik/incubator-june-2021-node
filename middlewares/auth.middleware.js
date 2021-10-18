const {OAuth, User} = require('../models');
const {jwtService, passwordService} = require('../services');
const {ACCESS, REFRESH} = require('../configs/config');
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
    },

    access: async (req, res, next) => {
        try {
            const {query: {Authorization: token_access}, body: {token_refresh}} = req;

            const token = token_refresh ? token_refresh : token_access;
            const token_type = token_refresh ? REFRESH : ACCESS;

            jwtService.verify(token, token_type);

            const foundJWT = await OAuth.findOne({token});

            if (!foundJWT) {
                return next({
                    message: 'Invalid token',
                    status: 401
                });
            }

            if (token_refresh) {
                await OAuth.deleteOne({token_refresh});
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {query: {Authorization}} = req;

            jwtService.verify(Authorization, REFRESH);

            const {token_refresh} = await OAuth.findOne({token_refresh: Authorization});

            if (!token_refresh) {
                return next({
                    message: 'Invalid token',
                    status: 401
                });
            }

            await OAuth.deleteOne({token_refresh});

            next();
        } catch (err) {
            next(err);
        }
    }
};
