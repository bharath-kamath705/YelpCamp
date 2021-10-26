const Joi = require('Joi')

module.exports.campgroundSchema =  Joi.object({
    title: Joi.string().required(),
    price: Joi.number().min(0),
    location: Joi.string().required(),
    description: Joi.optional().allow(String),
    image: Joi.optional().allow(String)
})

module.exports.reviewSchema =  Joi.object({
    text: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required()
}).required()