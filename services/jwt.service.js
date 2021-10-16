const jwt = require('jsonwebtoken');
const SECRET_WORD_ACCESS = 'secret_word_access';
const SECRET_WORD_REFRESH = 'secret_word_refresh';
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    create: () => {
        const token_access = jwt.sign({}, SECRET_WORD_ACCESS, {expiresIn: '30minutes'});
        const token_refresh = jwt.sign({}, SECRET_WORD_REFRESH, {expiresIn: '30days'});

        return {
            token_access,
            token_refresh
        };
    },

    decoded: (token, token_type) => {
        try {
            const secretKey = token_type === 'access' ? SECRET_WORD_ACCESS : SECRET_WORD_REFRESH;

           jwt.verify(token, secretKey);
        } catch (err) {
            throw new ErrorHandler('Invalid token', 401);
        }
    }
};
