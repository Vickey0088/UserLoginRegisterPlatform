import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// DB connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Server
const PORT = 1000;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
