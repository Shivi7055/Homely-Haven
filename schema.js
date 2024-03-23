const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing :  Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.object({
            filename : Joi.string().default("filename"),
            url : Joi.string().default("https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256_1280.jpg").allow("").allow(null)
        }).default({
            filename : "filename",
            url : null,
        })
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required(),
});