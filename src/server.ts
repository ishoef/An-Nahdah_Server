import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db/initDB";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/users.routes";
import cors from "cors";
const app = express();
const port = config.port;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// DB
initDB();

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("an-nahdah server is live");
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Server Listener
app.listen(port, () => {
  console.log(`An-Nahdah Server is running on the port ${port}`);
});
