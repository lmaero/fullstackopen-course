export enum Gender {
  Male = "male",
  Female = "female",
  NonBinary = "non-binary",
}

export type DiaryEntryExcludingSSN = Omit<PatientEntry, "ssn" | "entries">;

export type NewPatientEntry = Omit<PatientEntry, "id">;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}
