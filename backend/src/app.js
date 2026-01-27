import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";

dotenv.config();
connectDB();

const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
);

app.use(express.json());

app.use("/api/movies", moviesRoutes);
app.use("/api/favorites", favoritesRoutes);

export default app;