const Joi = require('joi');

const refreshValidator = Joi.object({
    refresh: Joi.string(),
    all: Joi.number()
});

module.exports = refreshValidator;
