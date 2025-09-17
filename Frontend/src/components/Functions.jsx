import React from "react";
import { useContext } from "react";
import axios from "axios";
import { TodoContext } from "../context/Todocontext";

const Functions = ({ task }) => {
  const { tasks, settasks, backendUrl, toggleCompleted } =
    useContext(TodoContext);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(backendUrl + "/api/tasks/" + id);
      settasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => toggleCompleted(task._id)}
        className={`${
          task.completed ? "bg-yellow-500" : "bg-green-500"
        } text-white py-2 px-3 rounded font-bold`}
      >
        {task.completed ? "Undo" : "Done"}
      </button>
      <button
        onClick={() => handleDelete(task._id)}
        className="bg-red-500 text-white py-2 px-3 rounded font-bold"
      >
        Delete
      </button>
    </div>
  );
};

export default Functions;
