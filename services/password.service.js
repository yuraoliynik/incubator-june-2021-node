const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => {
        return bcrypt.hash(password, 10);
    },

    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new Error('Wrong email or password!!!');
        }
    }
};
