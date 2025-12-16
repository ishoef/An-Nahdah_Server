import express, { Request, Response } from "express";
import config from "./config";

const app = express();
const port = config.port;

app.get("/", (req: Request, res: Response) => {
  res.send("an-nahdah server is live");
});

app.listen(port, () => {
  console.log(`An-Nahdah Server is running on the port ${port}`);
});
