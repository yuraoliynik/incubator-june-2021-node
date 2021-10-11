const Joi = require('joi');

const userRoles = require('../constants/user-roles.enum');

const userPutValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),

    role: Joi.string()
        .allow(...Object.values(userRoles))
});

module.exports = userPutValidator;
