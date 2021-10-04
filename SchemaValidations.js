const Joi = require('Joi')

module.exports.campgroundSchema =  Joi.object({
    title: Joi.string().alphanum().required(),
    price: Joi.number().min(0),
    location: Joi.string().required(),
    description: Joi.optional().allow(String),
    image: Joi.optional().allow(String)
})