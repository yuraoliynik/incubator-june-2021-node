const jwt = require('jsonwebtoken');

const {
    JWT_SECRET_WORD_ACCESS,
    JWT_SECRET_WORD_REFRESH,
    JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT,
    JWT_SECRET_WORD_ACTION_FORGOT_PASSWORD
} = require('../configs/config');
const {
    actionTokenTypes,
    errorMessages,
    errorStatuses,
    tokenTypes
} = require('../constants');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    generateTokenAction: (actionTokenType) => {
        let actionSecretKey;

        switch (actionTokenType) {
            case actionTokenTypes.ACTIVATE_ACCOUNT:
                actionSecretKey = JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT;
                break;

            case actionTokenTypes.FORGOT_PASSWORD:
                actionSecretKey = JWT_SECRET_WORD_ACTION_FORGOT_PASSWORD;
                break;

            default:
                throw new ErrorHandler(errorMessages.WRONG_TOKEN_TYPE, errorStatuses.code_404);
        }

        const actionToken = jwt.sign({}, actionSecretKey, {expiresIn: '24hours'});

        return {
            token: actionToken,
            type: actionTokenType
        };
    },

    generateTokenPair: () => {
        const accessToken = jwt.sign({}, JWT_SECRET_WORD_ACCESS, {expiresIn: '15minutes'});
        const refreshToken = jwt.sign({}, JWT_SECRET_WORD_REFRESH, {expiresIn: '30days'});

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: (token, tokenType = tokenTypes.ACCESS) => {
        try {
            let secretKey;

            switch (tokenType) {
                case tokenTypes.ACCESS:
                    secretKey = JWT_SECRET_WORD_ACCESS;
                    break;

                case tokenTypes.REFRESH:
                    secretKey = JWT_SECRET_WORD_REFRESH;
                    break;

                case actionTokenTypes.ACTIVATE_ACCOUNT:
                    secretKey = JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT;
                    break;

                case actionTokenTypes.FORGOT_PASSWORD:
                    secretKey = JWT_SECRET_WORD_ACTION_FORGOT_PASSWORD;
                    break;
            }

            return jwt.verify(token, secretKey);
        } catch (err) {
            throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatuses.code_401);
        }
    }
};
