import React from "react";
import TodoApp from "./pages/TodoApp";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <TodoApp />
      </BrowserRouter>
    </div>
  );
};

export default App;
