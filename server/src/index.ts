import express from "express";
import cors from "cors";

import gamesRouter from "./games.router.js";

const PORT = 3002;

const app = express();

app.use(express.json());
app.use(cors());
app.use(gamesRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
