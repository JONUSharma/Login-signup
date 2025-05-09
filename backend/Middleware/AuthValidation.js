const joi = require("joi")

const SignUpValidation = (req, res, next) => {
    const Schema = joi.object({
        Name: joi.string().min(4).max(100).required(),
        Password: joi.string().min(4).max(100).required(),
        Email: joi.string().email().required(),
    })
    const { error } = Schema.validate(req.body)
    if (error) {
        return res.status(400).json({ msg: "Bad request", error })
    }
    next();
}

const LoginValidation = (req, res, next) => {
    const Schema = joi.object({
        Password: joi.string().min(4).max(100).required(),
        Email: joi.string().email().required(),
    })
    const { error } = Schema.validate(req.body)
    if (error) {
        return res.status(400).json({ msg: "Bad request", error })
    }
    next();
}

module.exports = {
    SignUpValidation,
    LoginValidation
}