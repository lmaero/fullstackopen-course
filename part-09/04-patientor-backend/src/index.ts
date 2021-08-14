import cors from 'cors';
import express from 'express';
import diagnoseRoute from './routes/diagnose.route';
import patientRoute from './routes/patient.route';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnoseRoute);
app.use('/api/patients', patientRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
