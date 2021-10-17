const {OAuth} = require('../models');
const {jwtService} = require('../services');
const {ACCESS, REFRESH} = require('../configs/config');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {foundUser: {_id}} = req;

            const jwt = jwtService.create();

            const jwtUser = await (await OAuth.create({...jwt, user: _id})).populate('user');

            res.json(jwtUser);
        } catch (err) {
            next(err);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {body: {all}, foundUser: {_id}} = req;

            if (all) {
                await OAuth.deleteMany({user: _id});
            }

            res.json('logout');
        } catch (err) {
            next(err);
        }
    },

    access: async (req, res, next) => {
        try {
            const {query: {Authorization}} = req;

            const a = jwtService.verify(Authorization, ACCESS);

            const {token_access} = await OAuth.findOne({token_access: Authorization});

            if (!token_access) {
                return next({
                    message: 'Invalid token',
                    status: 401
                });
            }

            res.json(a);
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
