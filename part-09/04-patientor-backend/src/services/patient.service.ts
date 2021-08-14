/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.data';
import { NewPatientEntry, Patient } from '../types/patient.types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
};
