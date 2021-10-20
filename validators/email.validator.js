const Joi = require('joi');

const {regexp} = require('../constants');

const authValidator = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .regex(regexp.EMAIL)
        .required()
});

module.exports = authValidator;
