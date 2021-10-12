const Joi = require('joi');

const userPutValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
});

module.exports = userPutValidator;
