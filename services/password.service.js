const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const {errorMessages, errorStatuses} = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(
                errorMessages.WRONG_EMAIL_OR_PASSWORD,
                errorStatuses.status_400
            );
        }
    }
};
