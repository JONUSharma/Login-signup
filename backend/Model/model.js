const { required } = require("joi")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique:true
    },
    Password: {
        type: String,
        required: true,
    }
})

const user = mongoose.model("users",userSchema)
module.exports = { user}
