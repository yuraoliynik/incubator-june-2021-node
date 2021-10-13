const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    login: async (req, res) => {
        try {
            const {body, foundUser} = req;

            await passwordService.compare(body.password, foundUser.password);

            const normUser = userUtil.userNormalizator(foundUser);

            res.json(normUser);
        } catch (err) {
            res.json(err.message);
        }
    }
};
