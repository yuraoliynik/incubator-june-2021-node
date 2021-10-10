const User = require('../models/User');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {body: {email, password}} = req;

            const foundUser = await User.findOne({email});

            if (!foundUser) {
                throw new Error(`User with email: ${email} do not exists`);
            }

            if (password !== foundUser.password) {
                throw new Error('Bad!!!!!');
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
