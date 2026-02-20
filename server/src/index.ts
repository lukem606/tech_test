// index.js
import express from "express";
const app = express();
const port = "3000";

app
  .route("/stats")
  .get((req, res) => {
    res.send("Hello World!");
    console.log("GET Response sent");
  })
  .post((req, res) => {
    res.send("Received");
    console.log("POST Response sent");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
