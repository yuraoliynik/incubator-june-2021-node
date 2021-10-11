const User = require('../models/User');

const passwordService = require('../services/password.service');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {body: {email, password}} = req;

            const foundUser = await User.findOne({email}).select('+password');

            if (!foundUser) {
                throw new Error(`User with email: ${email} do not exists`);
            }

            await passwordService.compare(password, foundUser.password);

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
