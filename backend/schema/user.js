// joy validation for user

const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    address: Joi.string().min(3).max(500).required(),
});

module.exports = userSchema;
