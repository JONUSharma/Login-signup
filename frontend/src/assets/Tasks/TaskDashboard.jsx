import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../Redux/TaskSlice/TaskSlice";
import { FiPlus } from "react-icons/fi";
import TaskList from "./TaskList";
import CreateTaskModal from "./CreateTaskModal";

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className="  h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center  gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiPlus size={18} />
          New Task
        </button>
      </div>

      {/* Task List */}
      <TaskList tasks={tasks} loading={loading} />

      {/* Create Task Modal */}
      {openModal && <CreateTaskModal onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default TaskDashboard;
