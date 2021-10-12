const passwordService = require('../services/password.service');

module.exports = {
    login: async (req, res) => {
        try {
            const {body, foundUser} = req;

            await passwordService.compare(body.password, foundUser.password);

            res.json('OK!!!!!');
        } catch (err) {
            res.json(err.message);
        }
    }
};
