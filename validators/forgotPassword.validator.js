const Joi = require('joi');

const {regexp} = require('../constants');

const forgotPasswordValidator = Joi.object({
    newPassword: Joi.string()
        .min(6)
        .regex(regexp.PASSWORD)
        .required()
});

module.exports = forgotPasswordValidator;
