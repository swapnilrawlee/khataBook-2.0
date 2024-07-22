import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/", fileRoutes);
app.use("/api", userRoutes);  // Prefix for user routes

export default app;
