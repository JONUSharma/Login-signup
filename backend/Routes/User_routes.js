const express = require("express")
const route = express.Router();

const {SignUpValidation,LoginValidation} = require("../Middleware/AuthValidation")
const { signup,login } = require("../Controller/Controller");


route.post("/signup",SignUpValidation,signup)
route.post("/login",LoginValidation,login)

module.exports = route