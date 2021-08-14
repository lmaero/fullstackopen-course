import { Discharge, Entry, HealthCheckRating } from '../types/entries.types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStrings = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error("That's not a string");
  }
  return string;
};

const parseEntryType = (type: unknown) => {
  const Hospital = 'Hospital';
  const OccupationalHealthcare = 'OccupationalHealthcare';
  const HealthCheck = 'HealthCheck';
  if (type === 'Hospital') return Hospital;
  if (type === 'OccupationalHealthcare') return OccupationalHealthcare;
  if (type === 'HealthCheck') return HealthCheck;
  throw new Error('No valid entry type found');
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes) return [];

  if (!Array.isArray(codes)) throw new Error('Must be an array');

  if (!codes.every((code) => parseStrings(code)))
    throw new Error('All of them must be strings');

  return codes as string[];
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge) throw new Error('You should supply a discharge');
  return discharge as Discharge;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown,
): HealthCheckRating => {
  if (!healthCheckRating)
    throw new Error('You should supply a healthCheckRating');
  return healthCheckRating as HealthCheckRating;
};

type Fields = {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  type: unknown;
  diagnosisCodes?: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  healthCheckRating?: unknown;
};

const toNewEntry = ({
  id,
  description,
  date,
  specialist,
  type,
  diagnosisCodes,
  discharge,
  employerName,
  healthCheckRating,
}: Fields): Entry => {
  const baseProps = {
    id: parseStrings(id),
    description: parseStrings(description),
    date: parseStrings(date),
    specialist: parseStrings(specialist),
    type: parseEntryType(type),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };

  switch (baseProps.type) {
    case 'Hospital':
      return {
        ...baseProps,
        type: 'Hospital',
        discharge: parseDischarge(discharge),
      };
    case 'OccupationalHealthcare':
      return {
        ...baseProps,
        type: 'OccupationalHealthcare',
        employerName: parseStrings(employerName),
      };
    case 'HealthCheck':
      return {
        ...baseProps,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    default:
      throw new Error('Not known Entry');
  }
};

export default toNewEntry;
