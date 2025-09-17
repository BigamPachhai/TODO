import React, { useContext } from "react";
import axios from "axios";
import { TodoContext } from "../context/Todocontext";

const TodoInput = () => {
  const {
    tasks,
    settasks,
    date,
    backendUrl,
    setdate,
    taskInput,
    settaskInput,
  } = useContext(TodoContext);

  const handleAddTask = async () => {
    if (taskInput.trim() === "" || date === "") {
      return;
    }

    try {
      const newTask = { title: taskInput, date: date };
      const res = await axios.post(backendUrl + "/api/tasks", newTask);

      settasks([...tasks, res.data]);
      settaskInput("");
      setdate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center max-w-2xl mx-auto">
        <input
          className="flex-1 border-2 border-gray-400 p-3 rounded"
          type="text"
          value={taskInput}
          onChange={(e) => settaskInput(e.target.value)}
          placeholder="What do you need to do?"
        />
        <input
          type="date"
          className="border-2 border-gray-400 p-3 rounded"
          name="dueDate"
          value={date}
          onChange={(e) => setdate(e.target.value)}
          id="dueDate"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white py-3 px-6 rounded font-bold"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
