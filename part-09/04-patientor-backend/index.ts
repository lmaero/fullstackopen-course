import express from "express";

const app = express();

app.get("/ping", (_req, res) => {
  console.log("Someone pinged here");
  res.send("Pong");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
