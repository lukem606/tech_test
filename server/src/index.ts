import express from "express";
import cors from "cors";

import gamesRouter from "./games.router.js";
import { runMigrations } from "./db/database.js";

const PORT = 3002;

const app = express();

app.use(express.json());
app.use(cors());
app.use(gamesRouter);

const start = async () => {
  await runMigrations();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

start().catch((error: unknown) => {
  console.error("Server startup failed", error);
  process.exit(1);
});
