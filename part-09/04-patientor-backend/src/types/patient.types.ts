export type Gender = 'male' | 'female' | 'non-binary';
export type DiaryEntryExcludingSSN = Omit<PatientEntry, 'ssn'>;

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}
