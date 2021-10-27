const {errorMessages, errorStatuses} = require('../constants');

module.exports = {
    isBodyValid: (validator, authKey = 0) => (req, res, next) => {
        try {
            const {body} = req;

            const {error} = validator.validate(body);

            if (authKey && error) {
                return next({
                    message: errorMessages.WRONG_EMAIL_OR_PASSWORD,
                    status: errorStatuses.code_400
                });
            }

            if (error) {
                return next({
                    message: error.details[0].message,
                    status: errorStatuses.code_400
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isQueryValid: (validator) => (req, res, next) => {
        try {
            const {query} = req;

            const {error} = validator.validate(query);

            if (error) {
                return next({
                    message: error.details[0].message,
                    status: errorStatuses.code_400
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    }
};
