const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/errorHandler');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler('Wrong email or password!!!', 404);
        }
    }
};
