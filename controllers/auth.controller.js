const {OAuth} = require('../models');
const {jwtService} = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {foundUser} = req;

            const jwt = jwtService.create();

            const jwtUser = await (await OAuth.create({...jwt, user: foundUser._id})).populate('user');

            res.json(jwtUser);
        } catch (err) {
            next(err);
        }
    },

    logout: (req, res, next) => {
        try {

        } catch (err) {
            next(err);
        }
    },

    oauth: async (req, res, next) => {
        try {
            const {query: {Authorization}} = req;

            const token_access = await OAuth.findOne({token_access: Authorization});

            if (!token_access) {
                return next({
                    message: 'Invalid token',
                    status: 401
                });
            }

            jwtService.decoded(token_access, 'access');
        } catch (err) {
            next(err);
        }
    }
};
