import React, { useState } from "react";
import { login, getUser } from "./AuthService";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthState }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      const user = await getUser();
      setAuthState({
        isLoggedIn: true,
        user: user.data,
      });
      alert(`Welcome ${user.data.username}!`);
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login error:", error);
      alert(
        "Error logging in: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form
      className="flex justify-center items-center min-h-screen bg-blue-400"
      onSubmit={handleLogin}
    >
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Login </h2>
        <input
          required
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          value={formData.email}
          className="w-full p-3 mb-4 border-2 border-gray-400 rounded"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full p-3 mb-4 border-2 border-gray-400 rounded"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
