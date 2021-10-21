const {emailActions, errorStatuses} = require('../constants');
const {ActionToken, Oauth, User} = require('../models');
const {emailService, jwtService, passwordService} = require('../services');
const userUtil = require('../util/user.util');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {foundUser} = req;

            const normedUser = userUtil.userNormalizator(foundUser);

            const tokenPair = jwtService.generateTokenPair();

            await Oauth.create({
                ...tokenPair,
                user: foundUser._id
            });

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

            res.json({
                user: foundUser,
                ...tokenPair
            });
        } catch (err) {
            next(err);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {foundUser: {_id, name, email}} = req;

            const token_action = await jwtService.generateTokenAction();

            await ActionToken.create({
                token_action,
                user: _id
            });

            const linkForgotPassword = `http://localhost:5000/auth/forgot-password/${token_action}`;

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
    },

    changePassword: async (req, res, next) => {
        try {
            const {body: {password}, foundUser: {_id, name, email}} = req;

            const hashedPassword = await passwordService.hash(password);

            await Oauth.deleteMany({user: _id});

            await User.updateOne(
                {_id},
                {password: hashedPassword}
            );

            await emailService.sendMail(
                email,
                emailActions.CHANGE_PASSWORD,
                {userName: name}
            );

            res.sendStatus(errorStatuses.code_201);
        } catch (err) {
            next(err);
        }
    }
};
