export enum Gender {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non-binary',
}

export type DiaryEntryExcludingSSN = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}
