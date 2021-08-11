import diagnoses from '../../data/diagnoses.data';
import { DiagnoseEntry } from '../types/diagnose.types';

const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
