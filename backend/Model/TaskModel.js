const mongoose = require("mongoose");

 const taskScheme = new mongoose.Schema({
    taskName :  {
        type : String,
        required : true
    },
    taskDescription : {
        type : String,
        required : true
    },
    taskStatus : {
        type : String,
        enum : ["pending", "inprogress", "completed"],
        default : "pending"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    
 }, {
    timestamps : true
 })

 const task = mongoose.model("tasks", taskScheme)
 module.exports = { task }