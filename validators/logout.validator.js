const Joi = require('joi');

const logoutValidator = Joi.object({
    all: Joi.number()
        .required()
});

module.exports = logoutValidator;
