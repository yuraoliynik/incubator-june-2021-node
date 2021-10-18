const jwt = require('jsonwebtoken');

const {JWT_SECRET_WORD_ACCESS, JWT_SECRET_WORD_REFRESH} = require('../configs/config');
const {errorMessages, errorStatuses, tokenTypes} = require('../constants');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    generateTokenPair: () => {
        const token_access = jwt.sign({}, JWT_SECRET_WORD_ACCESS, {expiresIn: '15minutes'});
        const token_refresh = jwt.sign({}, JWT_SECRET_WORD_REFRESH, {expiresIn: '30days'});

        return {
            token_access,
            token_refresh
        };
    },

    verifyToken: (token, token_type = tokenTypes.ACCESS) => {
        try {
            const secretKey = token_type === tokenTypes.ACCESS ? JWT_SECRET_WORD_ACCESS : JWT_SECRET_WORD_REFRESH;

            return jwt.verify(token, secretKey);
        } catch (err) {
            throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatuses['401']);
        }
    }
};
