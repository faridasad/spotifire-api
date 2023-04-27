import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hi Mom!");
});

app.listen(5000, () => console.log("Server Running"));
