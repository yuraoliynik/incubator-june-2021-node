module.exports = {
    userNormalizator: (userToNormalize = {}) => {
        const fieldsToRemove = {
            password: undefined
        };

        Object.assign(userToNormalize, fieldsToRemove);

        return userToNormalize;
    }
};
