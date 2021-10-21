const {emailActions, errorStatuses} = require('../constants');
const {Oauth, User} = require('../models');
const {emailService, passwordService} = require('../services');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const foundUsers = await User.find({});

            res.json(foundUsers);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {foundUser} = req;

            res.json(foundUser);
        } catch (err) {
            next(err);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {body, body: {name, email, password}} = req;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({
                ...body,
                password: hashedPassword
            });

            const normedUser = userUtil.userNormalizator(createdUser.toObject());

            await emailService.sendMail(
                email,
                emailActions.USER_WAS_REGISTERED,
                {userName: name}
            );

            res
                .status(errorStatuses.code_201)
                .json(normedUser);
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {params: {userId}, body} = req;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                body,
                {new: true, runValidators: true}
            );

            res
                .status(errorStatuses.code_201)
                .json(updatedUser);
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {params: {userId}, foundUser: {name, email}} = req;

            await User.deleteOne({user: userId});
            Oauth.deleteOne({user: userId});

            await emailService.sendMail(
                email,
                emailActions.USER_WAS_DELETED,
                {userName: name}
            );

            res.sendStatus(errorStatuses.code_204);
        } catch (err) {
            next(err);
        }
    }
};
