import { createContext, useState } from "react";
import axios from "axios";

export const TodoContext = createContext();

const TodoProvider = (props) => {
  const [tasks, settasks] = useState([]);
  const [taskInput, settaskInput] = useState("");
  const [date, setdate] = useState("");
  const [dateInput, setdateInput] = useState("");

  const backendUrl = "http://localhost:3000";

  const toggleCompleted = async (id) => {
    try {
      const res = await axios.post(backendUrl + "/api/tasks/toggle/" + id);
      settasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {}
  };

  const value = {
    tasks,
    settasks,
    taskInput,
    settaskInput,
    date,
    setdate,
    toggleCompleted,
    backendUrl,
    dateInput,
    setdateInput,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};

export default TodoProvider;
