const User = require('../models/User');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = await User.findOne({email: req.params.email});

            if (!user) {
                throw new Error(`User whit email: ${req.params.email} is not exist`);
            }

            if (req.body.password !== user.password) {
                throw new Error(`Bad password!!!!!`);
            }

            next();

        } catch (err) {
            res.json(err.message);
        }
    }
};
