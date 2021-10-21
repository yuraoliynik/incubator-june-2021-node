const jwt = require('jsonwebtoken');

const {
    JWT_SECRET_WORD_ACCESS,
    JWT_SECRET_WORD_ACTION,
    JWT_SECRET_WORD_REFRESH
} = require('../configs/config');
const {errorMessages, errorStatuses, tokenTypes} = require('../constants');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    generateTokenAction: () => jwt.sign({}, JWT_SECRET_WORD_ACTION, {expiresIn: '24hours'}),

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
            let secretKey;

            switch (token_type) {
                case tokenTypes.ACCESS:
                    secretKey = JWT_SECRET_WORD_ACCESS;
                    break;

                case tokenTypes.ACTION:
                    secretKey = JWT_SECRET_WORD_ACTION;
                    break;

                case tokenTypes.REFRESH:
                    secretKey = JWT_SECRET_WORD_REFRESH;
                    break;
            }

            return jwt.verify(token, secretKey);
        } catch (err) {
            throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatuses.code_401);
        }
    }
};
