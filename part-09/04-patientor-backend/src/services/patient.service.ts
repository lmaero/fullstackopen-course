import patients from '../../data/patients.data';
import { PatientEntry } from '../types/patient.types';

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

export default {
  getPatients,
};
