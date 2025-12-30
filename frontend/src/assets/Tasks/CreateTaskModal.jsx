import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../Redux/TaskSlice/TaskSlice";
import { toast } from "react-toastify";
import { X, LayoutList, AlignLeft, Calendar } from "lucide-react"; // npm install lucide-react

const CreateTaskModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitTask = async (e) => {
    e.preventDefault();
    if (!formData.taskName || !formData.taskDescription) {
      return toast.error("Please provide all task details");
    }
    try {
      await dispatch(createTask(formData)).unwrap();
      onClose();
    } catch {
      toast.error("An error occurred while creating the task");
    }
  };

  return (
    <div className="fixed inset-0 z-[100]  flex items-center justify-center p-4">
      {/* Backdrop with sophisticated blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden transform transition-all">
        
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <LayoutList size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Create Task</h2>
              <p className="text-xs text-slate-500 font-medium">Add a new item to your workspace</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Section */}
        <form onSubmit={submitTask} className="p-8">
          <div className="space-y-6">
            
            {/* Task Name Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 ml-1 flex items-center gap-2">
                Task Title
              </label>
              <input
                type="text"
                name="taskName"
                placeholder="Enter task name..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-400 bg-white"
                onChange={handleChange}
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 ml-1">
                Description
              </label>
              <div className="relative">
                <textarea
                  name="taskDescription"
                  rows="4"
                  placeholder="Describe the objective of this task..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-400 bg-white resize-none"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Footer / Actions */}
          <div className="mt-10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200 active:scale-95 transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;