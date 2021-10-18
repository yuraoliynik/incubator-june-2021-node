const {Oauth} = require('../models');
const userUtil = require('../util/user.util');
const {jwtService} = require('../services');
const {errorStatuses} = require('../constants');

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

    logout: async (req, res, next) => {
        try {
            const {foundUser} = req;

            await Oauth.deleteOne({user: foundUser._id});

            res.sendStatus(errorStatuses.status_205);
        } catch (err) {
            next(err);
        }
    }
};
