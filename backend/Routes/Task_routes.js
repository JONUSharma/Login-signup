const express = require("express");
const { authMiddleware } = require("../Middleware/AuthValidation");
const { createTask, fetchTask, updateTask, deleteTask } = require("../Controller/TaskController");
const route = express.Router();


route.post("/create-task",authMiddleware,createTask)
route.get("/fetch-task",authMiddleware,fetchTask)
route.put("/update-task/:id",authMiddleware,updateTask)
route.delete("/delete-task/:id",authMiddleware,deleteTask)

module.exports = route