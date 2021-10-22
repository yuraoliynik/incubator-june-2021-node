const {HOST_URL} = require('../configs/config');
const {actionTokenTypes, emailActions, errorStatuses} = require('../constants');
const {ActionToken, Oauth, User} = require('../models');
const {emailService, jwtService} = require('../services');

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
            const {body} = req;

            const createdUser = await User.createUserWithHashPassword(body);

            const normedUser = createdUser.normalize();
            const {_id, name, email} = normedUser;

            const actionToken = jwtService.generateTokenAction(actionTokenTypes.ACTIVATE_ACCOUNT);
            await ActionToken.create({
                ...actionToken,
                user: _id
            });

            const linkActivateAccount = `${HOST_URL}/auth/activate-account/${actionToken.token}`;
            await emailService.sendMail(
                email,
                emailActions.USER_WAS_REGISTERED,
                {
                    userName: name,
                    link: linkActivateAccount
                }
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
            const {body, foundUser: {_id}} = req;

            const updatedUser = await User.findByIdAndUpdate(
                _id,
                body,
                {new: true, runValidators: true}
            );
            const {name, email} = updatedUser;

            await emailService.sendMail(
                email,
                emailActions.USER_DATA_WAS_UPDATED,
                {userName: name}
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

            await User.deleteOne({_id: userId});
            await Oauth.deleteMany({user: userId});

            await emailService.sendMail(
                email,
                emailActions.DELETED_ACCOUNT,
                {userName: name}
            );

            res.sendStatus(errorStatuses.code_204);
        } catch (err) {
            next(err);
        }
    }
};
