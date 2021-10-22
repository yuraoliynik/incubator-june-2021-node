const {HOST_URL} = require('../configs/config');
const {actionTokenTypes, emailActions, errorStatuses} = require('../constants');
const {ActionToken, Oauth, User} = require('../models');
const {emailService, jwtService} = require('../services');

module.exports = {
    activateAccount: async (req, res, next) => {
        try {
            const {foundUser: {_id, name, email}} = req;

            await User.activate(_id);

            await emailService.sendMail(
                email,
                emailActions.ACTIVATED_ACCOUNT,
                {userName: name}
            );

            res.sendStatus(errorStatuses.code_201);
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const {foundUser, foundUser: {_id, name, email}} = req;

            const tokenPair = jwtService.generateTokenPair();
            await Oauth.create({
                ...tokenPair,
                user: _id
            });

            await emailService.sendMail(
                email,
                emailActions.USER_IS_LOGGED_IN,
                {userName: name}
            );

            const normedUser = foundUser.normalize();

            res.json({
                user: normedUser,
                ...tokenPair
            });
        } catch (err) {
            next(err);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {foundUser} = req;

            await Oauth.deleteOne({user: foundUser._id});

            res.sendStatus(errorStatuses.code_205);
        } catch (err) {
            next(err);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {foundUser} = req;

            const tokenPair = jwtService.generateTokenPair();

            await Oauth.create({
                ...tokenPair,
                user: foundUser._id
            });

            res
                .status(errorStatuses.code_201)
                .json({
                    user: foundUser,
                    ...tokenPair
                });
        } catch (err) {
            next(err);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const {
                body: {newPassword},
                foundUser: {_id, name, email}
            } = req;

            await Oauth.deleteMany({user: _id});

            await User.updatePassword(_id, newPassword);

            await emailService.sendMail(
                email,
                emailActions.CHANGE_PASSWORD,
                {userName: name}
            );

            res.sendStatus(errorStatuses.code_201);
        } catch (err) {
            next(err);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {foundUser: {_id, name, email}} = req;

            const actionToken = await jwtService.generateTokenAction(actionTokenTypes.FORGOT_PASSWORD);
            await ActionToken.create({
                ...actionToken,
                user: _id
            });

            const linkForgotPassword = `${HOST_URL}/auth/forgot-password/${actionToken.token}`;
            await emailService.sendMail(
                email,
                emailActions.FORGOT_PASSWORD,
                {
                    userName: name,
                    link: linkForgotPassword
                }
            );

            res.sendStatus(errorStatuses.code_201);
        } catch (err) {
            next(err);
        }
    }
};
