const jwt = require('jsonwebtoken');
const {SECRET_WORD_ACCESS, SECRET_WORD_REFRESH, ACCESS} = require('../configs/config');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    create: () => {
        const token_access = jwt.sign({}, SECRET_WORD_ACCESS, {expiresIn: '15minutes'});
        const token_refresh = jwt.sign({}, SECRET_WORD_REFRESH, {expiresIn: '30days'});

        return {
            token_access,
            token_refresh
        };
    },

    verify: (token, token_type) => {
        try {
            const secretKey = token_type === ACCESS ? SECRET_WORD_ACCESS : SECRET_WORD_REFRESH;

            return jwt.verify(token, secretKey);
        } catch (err) {
            throw new ErrorHandler('Invalid token', 401);
        }
    }
};
