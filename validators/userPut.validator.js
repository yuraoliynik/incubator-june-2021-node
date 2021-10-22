const Joi = require('joi');

const userPutValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .trim(),

    secondName: Joi.string()
        .alphanum()
        .max(20)
        .trim(),

    age: Joi.number()
});

module.exports = userPutValidator;
