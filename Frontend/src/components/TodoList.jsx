import React, { useContext } from "react";
import { TodoContext } from "../context/Todocontext";
import Functions from "./Functions";

const TodoList = () => {
  const { tasks, date, toggleCompleted } = useContext(TodoContext);
  return (
    <div className="p-4">
      <div className="space-y-3 max-w-2xl mx-auto">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded border-2 ${
              task.completed
                ? "bg-green-100 border-green-300"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="flex-1 mb-2 sm:mb-0">
              <div
                className={`font-bold ${
                  task.completed ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {task.title}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {new Date(task.date).toLocaleDateString()}
              </div>
            </div>

            <div className="flex justify-end sm:ml-4">
              <Functions task={task} />
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">Nothing here yet!</div>
            <div className="text-gray-400 text-sm">
              Add something to do above
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
