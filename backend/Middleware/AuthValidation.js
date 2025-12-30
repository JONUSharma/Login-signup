const joi = require("joi")
const {user} = require("../Model/model")
const jwt = require("jsonwebtoken")
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

const authMiddleware = async (req, res, next) => {
  try {
    // 1️ Get token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Unauthorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // 2️ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3️ Attach user to request
    req.user = await user.findById(decoded._id).select("-Password"); // exclude password

    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized, user not found" });
    }

    next(); // ✅ token valid, proceed
  } catch (error) {
    console.error("error");
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
module.exports = {
    SignUpValidation,
    LoginValidation,
    authMiddleware
}