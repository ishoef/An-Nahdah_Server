import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";

const app = express();
const port = config.port;

app.use(express.json());

// DB
initDB();

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("an-nahdah server is live");
});

// API Routes


// Server Listener
app.listen(port, () => {
  console.log(`An-Nahdah Server is running on the port ${port}`);
});
