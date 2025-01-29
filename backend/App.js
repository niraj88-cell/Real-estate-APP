import express from "express";
import postRoute from "./routes/Post.js";
import authRoute from "./routes/Auth.js";
import testRoute from "./routes/TestRoute.js";
import userRoute from "./routes/User.js";
import chatRoute from "./routes/Chat.js";
import messageRoute from "./routes/Message.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();


// Middleware setup
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Route <handling></handling>
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/user", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Test log
console.log("test");

// Start server
app.listen(8800, () => {
  console.log("Server is running on port 8800");
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});