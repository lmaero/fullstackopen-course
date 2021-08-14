import express from 'express';
import patientService from '../services/patient.service';
import toNewPatientEntry from '../utils/patient.utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);

  if (patient) {
    return res.status(200).send(patient);
  }
  return res.status(404).send('Patient not found');
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
