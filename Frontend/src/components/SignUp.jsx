import React, { useState } from "react";
import { signup } from "./AuthService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate that fields are not empty
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Sending data:", formData); // Debug log

    try {
      const res = await signup(formData);
      alert("Sign up successful! " + res.data.message);
    } catch (error) {
      console.error("Full error:", error);

      if (error.response) {
        // Server responded with error status
        console.error("Error response:", error.response.data);
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Server error";
        const errorDetails = error.response.data.errors
          ? "\nDetails: " + error.response.data.errors.join(", ")
          : "";
        alert("Error signing up: " + errorMessage + errorDetails);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        alert(
          "Error signing up: Unable to connect to server. Make sure the backend is running on port 3000."
        );
      } else {
        // Something else happened
        alert("Error signing up: " + error.message);
      }
    }
  };

  return (
    <form
      className="flex items-center justify-center min-h-screen bg-blue-400"
      onSubmit={handleSignUp}
    >
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <input
          required
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          className="w-full p-3 mb-4 border-2 border-gray-400 rounded"
        />
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
          className="w-full py-3 bg-green-500 text-white font-bold rounded"
        >
        Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUp;
