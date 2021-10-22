const Joi = require('joi');

const {regexp} = require('../constants');

const changePasswordValidator = Joi.object({
    password: Joi.string()
        .min(6)
        .regex(regexp.PASSWORD)
        .required(),

    newPassword: Joi.string()
        .min(6)
        .regex(regexp.PASSWORD)
        .required()
});

module.exports = changePasswordValidator;
