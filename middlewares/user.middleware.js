const User = require('../models/User');

const userValidator = require('../validators/user.validator');
const userUtil = require('../util/user.util');

module.exports = {
    isUserValid: async (req, res, next) => {
        try {
            const {body} = req;

            req.validatedUser = await userValidator.validateAsync(body);

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const foundUser = await User.findById(userId).lean();

            if (!foundUser) {
                throw new Error(`User with id: ${userId} already exists`);
            }

            const normUser = userUtil.userNormalizator(foundUser);

            req.foundUser = normUser;

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {validatedUser: {email}} = req;

            const userEmail = await User.findOne({email}).lean();

            if (userEmail) {
                throw new Error(`User whit email: ${email} exists`);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
