const User = require('../models/User');
const authValidator = require('../validators/auth.validator');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {body} = req;

            const {error} = authValidator.validate(body);

            if (error) {
                throw new Error('Wrong email or password!!!');
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const foundUser = await User.findOne({email})
                .select('+password')
                .lean();

            if (!foundUser) {
                throw new Error('Wrong email or password!!!');
            }

            req.foundUser = foundUser;

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
