import { Gender, NewPatientEntry } from "../types/patient.types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStrings = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error("That's not a string");
  }
  return string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseStrings(name),
    dateOfBirth: parseStrings(dateOfBirth),
    ssn: parseStrings(ssn),
    gender: parseGender(gender),
    occupation: parseStrings(occupation),
  };

  return newEntry;
};

export default toNewPatientEntry;
