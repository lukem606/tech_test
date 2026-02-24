import express, {
  type RequestHandler,
  type Request,
  type Response,
} from "express";
import { db } from "./db/database.js";

const PORT = 3002;
const app = express();

const database = db;

const postGamesHandler: RequestHandler = (req: Request, res: Response) => {
  res.send("Received");
  console.log("POST Response sent");
};

const getGamesStatsHandler: RequestHandler = (req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("GET Response sent");
};

app.route("/games").get(getGamesStatsHandler).post(postGamesHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
