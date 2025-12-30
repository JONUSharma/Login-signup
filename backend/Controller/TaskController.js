const { task } = require("../Model/TaskModel");

// create a task
const createTask = async (req, res) => {
    try {
        const { taskName, taskDescription } = req.body;

        if (!taskName || !taskDescription) {
            return res.status(400).json({ msg: "All fields are required", success: false });
        }

        const newTask = await task.create({
            taskName,
            taskDescription,
            userId: req.user._id,
        });

        res.status(201).json({
            msg: "Task created successfully",
            success: true,
            newTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", success: false });
    }
};


// get task
const fetchTask = async (req, res) => {
    try {
        const allTask = await task
            .find({ userId: req.user._id })
            .populate("userId", "Name Email");

        res.status(200).json({
            msg: "Task fetched successfully",
            success: true,
            allTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", success: false });
    }
};


// update Task 
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskStatus } = req.body;
        const updatedTask = await task.findOneAndUpdate(
            { _id: id, userId: req.user._id }, // only allow owner to update
            { taskStatus: taskStatus },
            { new: true } // return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ msg: "Task not found", success: false });
        }

        res.status(200).json({
            msg: "Task updated successfully",
            success: true,
            updatedTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", success: false });
    }
};


// delete task 
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await task.findOneAndDelete({ _id: id, userId: req.user._id });

        if (!deletedTask) {
            return res.status(404).json({ msg: "Task not found", success: false });
        }

        res.status(200).json({
            msg: "Task deleted successfully",
            success: true,
            deletedTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", success: false });
    }
};

module.exports = { createTask, fetchTask, updateTask, deleteTask };