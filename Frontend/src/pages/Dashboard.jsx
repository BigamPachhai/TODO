import React from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

const Dashboard = () => {
  return (
    <div>
      <div>
        <div>
          <h1>My Tasks</h1>
          <button>Log Out</button>
        </div>
      </div>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default Dashboard;
