const userUtil = require('../util/user.util');

module.exports = {
    login: (req, res, next) => {
        try {
            const {foundUser} = req;

            const normedUser = userUtil.userNormalizator(foundUser);

            res.json(normedUser);
        } catch (err) {
            next(err);
        }
    }
};
