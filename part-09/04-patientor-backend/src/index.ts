import cors from "cors";
import express from "express";
import diagnoseRoute from './routes/diagnose.route';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("Someone pinged here");
  res.send("Pong");
});

app.use('/api/diagnoses', diagnoseRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
