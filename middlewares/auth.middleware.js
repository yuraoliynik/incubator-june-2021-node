const {
    errorMessages,
    errorStatuses,
    headerNames,
    tokenTypes
} = require('../constants');
const {ActionToken, Oauth, User} = require('../models');
const {jwtService, passwordService} = require('../services');

module.exports = {
    isUserActivated: (req, res, next) => {
        try {
            const {foundUser: {isActive}} = req;

            if (!isActive) {
                return next({
                    message: errorMessages.USER_IS_NOT_ACTIVATED,
                    status: errorStatuses.code_403
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const foundUser = await User
                .findOne({email})
                .select('+password');

            if (!foundUser) {
                return next({
                    message: errorMessages.WRONG_EMAIL_OR_PASSWORD,
                    status: errorStatuses.code_400
                });
            }

            req.foundUser = foundUser;

            next();
        } catch (err) {
            next(err);
        }
    },


    isPasswordMatched: (findKey = 0) => async (req, res, next) => {
        try {
            const {body, foundUser} = req;

            if (!findKey) {
                await passwordService.compare(body.password, foundUser.password);

                return next();
            }

            const {password: hashPassword} = await User
                .findById(foundUser._id)
                .select('+password');

            await passwordService.compare(body.password, hashPassword);

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
                    status: errorStatuses.code_401
                });
            }

            jwtService.verifyToken(token, tokenTypes.ACCESS);

            const foundOauth = await Oauth.findOne({accessToken: token});
            console.log(foundOauth);
            if (!foundOauth) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
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
                    status: errorStatuses.code_401
                });
            }

            jwtService.verifyToken(token, tokenTypes.REFRESH);

            const foundOauth = await Oauth.findOne({refreshToken: token});

            if (!foundOauth) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            await Oauth.deleteOne({refreshToken: token});

            req.foundUser = foundOauth.user;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkActionToken: (actionTokenType) => async (req, res, next) => {
        try {
            const token = req.get(headerNames.AUTHORIZATION);

            if (!token) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            jwtService.verifyToken(token, actionTokenType);

            const foundActionToken = await ActionToken.findOne({token});

            if (!foundActionToken) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            await ActionToken.deleteOne({token});

            req.foundUser = foundActionToken.user;

            next();
        } catch (err) {
            next(err);
        }
    }
};
