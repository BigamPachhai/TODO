import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskrouter from "./routes/taskRoutes.js";
import authRouter from "./routes/auth.js";
import connectDB from "./config/mongodb.js";
import cookieParser from "cookie-parser";

dotenv.config();
//App Config
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://your-frontend-app.vercel.app", // Replace with your actual frontend URL
            "https://*.vercel.app",
          ]
        : "http://localhost:5173",
    credentials: true,
  })
);

//Api Routes
app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/tasks", taskrouter);
app.use("/api/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
