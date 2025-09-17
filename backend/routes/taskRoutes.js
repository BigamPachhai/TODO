import express from "express";
import taskModel from "../models/taskModel.js";
import jwt from "jsonwebtoken";

const taskrouter = express.Router();

// Strict auth middleware - blocks all requests without valid token
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication required. Please login." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Invalid token. Please login again." });
    }
    req.userId = decoded.id;
    next();
  });
};

// Apply strict auth middleware to ALL task routes
taskrouter.use(authMiddleware);

//Create a new task (REQUIRES LOGIN)
taskrouter.post("/", async (req, res) => {
  try {
    const task = await taskModel.create({
      ...req.body,
      user: req.userId, // Always add user ID since login is required
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

//Reading tasks (REQUIRES LOGIN)
taskrouter.get("/", async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.userId }); // Only user's tasks
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

//Delete a task (only if it belongs to the user)
taskrouter.delete("/:id", async (req, res) => {
  try {
    const task = await taskModel.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

//Toggle completed (only if it belongs to the user)
taskrouter.post("/toggle/:id", async (req, res) => {
  try {
    const task = await taskModel.findOne({
      _id: req.params.id,
      user: req.userId,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error toggling task:", error);
    res.status(500).json({ message: "Error toggling task" });
  }
});

export default taskrouter;
