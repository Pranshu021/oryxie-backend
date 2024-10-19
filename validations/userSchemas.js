const Joi = require('joi');

const userSignUpSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).trim().required(),
    email: Joi.string().email({tlds: true}).trim().required(),
    password: Joi.string().min(6).max(20).trim().required(),
})

module.exports = {
    userSignUpSchema
}