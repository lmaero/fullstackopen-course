import express from 'express';
import { v1 as uuid } from 'uuid';
import patientService from '../services/patient.service';
import toNewEntry from '../utils/entry.utils';
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

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);

  if (!patient) return res.status(404).send('Patient does not exist!');

  try {
    const date = new Date();
    const newEntry = toNewEntry({
      ...req.body,
      id: uuid(),
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    });
    const addedEntry = patientService.addEntry(patient, newEntry);
    return res.status(201).send(addedEntry);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export default router;
