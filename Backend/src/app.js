import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app= express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})