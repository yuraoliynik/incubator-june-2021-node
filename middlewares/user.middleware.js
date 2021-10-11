const User = require('../models/User');
const userValidator = require('../validators/user.validator');
const userPutValidator = require('../validators/userPut.validator');

module.exports = {
    isUserValid: async (req, res, next) => {
        try {
            const {body} = req;

            await userValidator.validateAsync(body);

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    isUserPutValid: async (req, res, next) => {
        try {
            const {body} = req;

            await userPutValidator.validateAsync(body);

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const foundUser = await User.findById(userId);

            if (!foundUser) {
                throw new Error(`User with id: ${userId} already exists`);
            }

            req.foundUser = foundUser;

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    isUserEmailExist: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new Error(`User whit email: ${email} exists`);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
