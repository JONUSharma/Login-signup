import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Axios/Axios";
import { toast } from "react-toastify";


// create task
export const createTask = createAsyncThunk('createTask', async (task) => {
    try {
        const response = await axios.post("/task/create-task", task);
        console.log(response.data)
        toast.success("Task created successfully")
        return response.data;
    } catch (error) {
        toast.error(error.message);
    }
})
// fetch all tasks
export const getTasks = createAsyncThunk('getTasks', async (_) => {
    try {
        const response = await axios.get("/task/fetch-task");
        return response.data;
    } catch (error) {
        toast.error(error.message);
    }
});

// delete task
export const deleteTask = createAsyncThunk('deleteTask', async (id) => {
    try {
        const response = await axios.delete(`/task/delete-task/${id}`);
        if (response.data.success) {
            toast.success("Task deleted successfully")
            return response.data;
        }
    } catch (error) {
        toast.error(error.message);
    }
})

// update task status
export const updateTaskStatus = createAsyncThunk(
    "tasks/updateStatus",
    async ({ id, taskStatus }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`/task/update-task/${id}`, {
                taskStatus,
            });
            return res.data;
        } catch (error) {
            toast.error("Failed to update status");
            return rejectWithValue(error.response?.data);
        }
    }
);


const TaskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload.allTask;
        });
        builder.addCase(getTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload)
            state.tasks = state.tasks.filter((task) => task._id !== action.payload.deletedTask._id);
        });
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(createTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = [...state.tasks, action.payload.newTask];
        });
        builder.addCase(createTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(updateTaskStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
            state.loading = false;
            const updatedTask = action.payload.updatedTask;
            const index = state.tasks.findIndex(
                (task) => task._id === action.payload.updatedTask._id
            );

            if (index !== -1) {
                state.tasks[index] = updatedTask;
            }
        });

        builder.addCase(updateTaskStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


    }
});

export default TaskSlice.reducer;
export const { } = TaskSlice.actions;
