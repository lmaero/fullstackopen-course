export enum Gender {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non-binary'
}
export type DiaryEntryExcludingSSN = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry,'id'>;

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}
