const Joi = require('joi');

const {regexp} = require('../constants');

const authValidator = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .regex(regexp.EMAIL)
        .required(),

    password: Joi.string()
        .min(6)
        .regex(regexp.PASSWORD)
        .required()
});

module.exports = authValidator;
