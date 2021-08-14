import diagnoses from '../../data/diagnoses.data';
import { Diagnosis } from '../types/diagnose.types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
