const Joi = require('joi');

const {regexp} = require('../constants');

const refreshValidator = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .regex(regexp.EMAIL)
        .required(),
    all: Joi.number()
});

module.exports = refreshValidator;
