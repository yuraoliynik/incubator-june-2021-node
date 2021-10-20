const Joi = require('joi');

const {regexp} = require('../constants');

const authValidator = Joi.object({
    password: Joi.string()
        .min(6)
        .regex(regexp.PASSWORD)
        .required()
});

module.exports = authValidator;
