const {OAuth} = require('../models');
const {jwtService} = require('../services');

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
    }
};
