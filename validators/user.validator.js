const Joi = require('joi');

const {regexp} = require('../constants');
const {userRoles} = require('../constants');

const userValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),

    email: Joi.string()
        .trim()
        .lowercase()
        .regex(regexp.EMAIL)
        .required(),

    password: Joi.string()
        .min(6)
        .regex(regexp.PASSWORD)
        .required(),

    role: Joi.string()
        .allow(...Object.values(userRoles))
});

module.exports = userValidator;
