import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, loading }) => {
  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No tasks yet. Create one!
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:grid-cols-1">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
