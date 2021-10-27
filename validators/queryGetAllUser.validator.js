const Joi = require('joi');

const queryGetAllUserValidator = Joi.object({
    perPage: Joi.number(),

    page: Joi.number(),

    sortBy: Joi.string(),

    order: Joi.string(),

    name: Joi.string(),

    'age.gte': Joi.string(),

    'age.lte': Joi.string(),

    role: Joi.string()
});

module.exports = queryGetAllUserValidator;
