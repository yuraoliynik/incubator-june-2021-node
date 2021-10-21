const {errorMessages, errorStatuses} = require('../constants');

module.exports = {
    isUserRolesChecked: (roles = []) => (req, res, next) => {
        try {
            const {foundUser: {role}} = req;

            if (!roles.includes(role)) {
                return next({
                    message: errorMessages.ACCESS_DENIED,
                    status: errorStatuses.code_403
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
