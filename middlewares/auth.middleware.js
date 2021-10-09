const User = require('../models/User');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {body: {email, password}} = req;

            const user = await User.findOne({email});

            if (!user) {
                throw new Error(`User whit email: ${email} is not exist`);
            }

            if (password !== user.password) {
                throw new Error(`Bad password!!!!!`);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
