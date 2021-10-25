const Joi = require('joi');

const {regexp} = require('../constants');
const {userStatuses, userRoles} = require('../constants');

const userValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),

    secondName: Joi.string()
        .alphanum()
        .max(20)
        .trim()
        .default(''),

    age: Joi.number(),

    status: Joi.string()
        .allow(...Object.values(userStatuses)),

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
