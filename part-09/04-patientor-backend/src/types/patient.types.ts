import { Entry } from './entries.types';

export enum Gender {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non-binary',
}

export type DiaryEntryExcludingSSN = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}
