const Joi = require('joi');

const {regexp} = require('../constants');

const emailValidator = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .regex(regexp.EMAIL)
        .required()
});

module.exports = emailValidator;
