import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://hows-app.vercel.app');
  next();
});

app.use(
  cors({
    origin: "https://hows-app.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.json({ limit: "100mb", extended: true }));
app.use(
  express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 })
);

app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/message", messageRoutes);

app.listen(PORT, () => {
  console.log("Server Up!");
  connectDB();
});
