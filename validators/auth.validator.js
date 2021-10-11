const Joi = require('joi');

const regexp = require('../constants/regexp');

const authValidator = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .required()
        .regex(regexp.EMAIL),

    password: Joi.string()
        .required()
});

module.exports = authValidator;
