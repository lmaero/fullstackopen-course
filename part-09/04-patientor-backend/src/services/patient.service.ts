/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.data';
import { NewPatientEntry, PatientEntry } from '../types/patient.types';

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id:string = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient
};
