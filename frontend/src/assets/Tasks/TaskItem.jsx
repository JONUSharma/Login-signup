import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus } from "../Redux/TaskSlice/TaskSlice";
import { FiTrash2, FiCheckCircle, FiClock, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const isCompleted = task.taskStatus === "completed";

  const removeTask = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await dispatch(
        updateTaskStatus({
          id: task._id,
          taskStatus: newStatus,
        })
      ).unwrap();
      toast.info(`Status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update task status");
    }
  };

  // Helper to define badge styles
  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-200 ring-emerald-500/10";
      case "inprogress":
        return "bg-amber-50 text-amber-600 border-amber-200 ring-amber-500/10";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200 ring-slate-500/10";
    }
  };

  return (
    <div className={`group relative bg-white p-6 rounded-2xl border transition-all duration-300 ${
      isCompleted ? "border-slate-100 opacity-80" : "border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5"
    }`}>
      
      {/* 🔹 Task Header & Info */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className={`text-lg font-bold tracking-tight transition-all ${
            isCompleted ? "text-slate-400 line-through" : "text-slate-800"
          }`}>
            {task.taskName}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {task.taskDescription}
          </p>
        </div>
        
        <button
          onClick={removeTask}
          className="ml-4 p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
          title="Delete Task"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        {/* 🔹 Enhanced Status Indicator */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            // Read-only badge for Completed tasks
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${getStatusStyles("completed")}`}>
              <FiCheckCircle size={14} />
              Completed
            </div>
          ) : (
            // Interactive Select for non-completed tasks
            <div className="relative">
              <select
                value={task.taskStatus}
                onChange={handleStatusChange}
                className={`appearance-none pl-3 pr-8 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-4 transition-all cursor-pointer ${getStatusStyles(task.taskStatus)}`}
              >
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Complete Task</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <FiClock size={12} />
              </div>
            </div>
          )}
        </div>

        {/* 🔹 Visual Timestamp Placeholder (Optional but looks professional) */}
        <span className="text-[10px] font-bold text-slate-300 uppercase">
          ID: {task._id.slice(-5)}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;