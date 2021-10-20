const {errorMessages, errorStatuses, headerNames, tokenTypes} = require('../constants');
const {ActionToken, Oauth, User} = require('../models');
const {jwtService, passwordService} = require('../services');

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
                    status: errorStatuses.status_400
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

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(headerNames.AUTHORIZATION);

            if (!token) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.status_401
                });
            }

            jwtService.verifyToken(token, tokenTypes.ACCESS);

            const foundOauth = await Oauth
                .findOne({token_access: token})
                .populate('user');

            if (!foundOauth) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.status_401
                });
            }

            req.foundUser = foundOauth.user;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(headerNames.AUTHORIZATION);

            if (!token) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.status_401
                });
            }

            jwtService.verifyToken(token, tokenTypes.REFRESH);

            const foundOauth = await Oauth
                .findOne({token_refresh: token})
                .populate('user');

            if (!foundOauth) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.status_401
                });
            }

            await Oauth.deleteOne({token_refresh: token});

            req.foundUser = foundOauth.user;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const token = req.get(headerNames.AUTHORIZATION);

            if (!token) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.status_401
                });
            }

            jwtService.verifyToken(token, tokenTypes.ACTION);

            const foundActionToken = await ActionToken
                .findOne({token_action: token})
                .populate('user');

            if (!foundActionToken) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.status_401
                });
            }

            await ActionToken.deleteOne({token_action: token});

            req.foundUser = foundActionToken.user;

            next();
        } catch (err) {
            next(err);
        }
    }
};
