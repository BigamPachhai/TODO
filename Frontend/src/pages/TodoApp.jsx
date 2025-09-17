// In TodoApp.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import TodoProvider from "../context/Todocontext";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import axios from "axios";

const TodoApp = () => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const response = await axios.get(backendUrl + "/api/auth/me", {
        withCredentials: true,
      });
      if (response.data) {
        setAuthState({
          isLoggedIn: true,
          user: response.data,
        });
      }
    } catch (error) {
      setAuthState({
        isLoggedIn: false,
        user: null,
      });
    }
  };

  return (
    <div>
      <Navbar authState={authState} setAuthState={setAuthState} />
      <Routes>
        <Route
          path="/"
          element={
            authState.isLoggedIn ? (
              <>
                <TodoInput />
                <TodoList />
              </>
            ) : (
              <div className="min-h-screen bg-blue-400 flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                  <div className="text-center text-white mb-8">
                    <h1 className="text-4xl font-bold mb-4"> To-do APP</h1>
                    <p className="text-lg mb-8">
                      Make yourself more efficient!!
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-center mb-6">
                      You need to login first
                    </h2>

                    <div className="space-y-3">
                      <Link to="/signup" className="block">
                        <button className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded">
                          Sign Up
                        </button>
                      </Link>

                      <Link to="/login" className="block">
                        <button className="w-full bg-gray-200 text-black py-3 px-6 rounded border">
                          Sign In
                        </button>
                      </Link>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Continue making an account for yourself
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        />
        <Route path="/login" element={<Login setAuthState={setAuthState} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default TodoApp;
