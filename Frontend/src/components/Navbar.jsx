import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoContext } from "../context/Todocontext";
import axios from "axios";
const Navbar = ({ authState, setAuthState }) => {
  const { backendUrl } = useContext(TodoContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setAuthState({
        isLoggedIn: false,
        user: null,
      });
      setShowDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <Link to="/">
        <h1 className="text-xl font-bold">TODO APP</h1>
      </Link>

      {authState.isLoggedIn ? (
        <div className="flex items-center">
          <span className="hidden sm:inline mr-4">
            Hi {authState.user?.username}!
          </span>
          <span className="sm:hidden mr-2 text-sm">
            {authState.user?.username}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-3 sm:px-4 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Link to="/login">
            <button className="bg-white text-blue-500 py-1 px-3 rounded">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 text-white py-1 px-3 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
