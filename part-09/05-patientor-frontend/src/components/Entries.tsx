import React from 'react';
import { Header, Icon, ItemDescription, Message } from 'semantic-ui-react';
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';

type GetDiagnosis = (code: string) => Diagnosis | undefined;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const HospitalCard = ({
  entry,
  getDiagnosis,
}: {
  entry: HospitalEntry;
  getDiagnosis: GetDiagnosis;
}) => {
  const { date, description, diagnosisCodes } = entry;

  return (
    <>
      <Message>
        <Header>
          {date}
          <Icon name='hospital' />
        </Header>
        <ItemDescription>{description}</ItemDescription>
        {diagnosisCodes && (
          <>
            <h4>Diagnosis Codes:</h4>
            <ul>
              {diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosis(code)?.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </Message>
    </>
  );
};

const OccupationalHealthcareCard = ({
  entry,
  getDiagnosis,
}: {
  entry: OccupationalHealthcareEntry;
  getDiagnosis: GetDiagnosis;
}) => {
  const { date, description, diagnosisCodes } = entry;

  return (
    <>
      <Message>
        <Header>
          {date}
          <Icon name='stethoscope' />
        </Header>
        <ItemDescription>{description}</ItemDescription>
        {diagnosisCodes && (
          <>
            <h4>Diagnosis Codes:</h4>
            <ul>
              {diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosis(code)?.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </Message>
    </>
  );
};

const HealthCheckCard = ({
  entry,
  getDiagnosis,
}: {
  entry: HealthCheckEntry;
  getDiagnosis: GetDiagnosis;
}) => {
  const { date, description, diagnosisCodes, healthCheckRating } = entry;
  function getHeartColor(rating: number): string {
    if (rating === 0) return 'green';
    if (rating === 1) return 'yellow';
    if (rating === 2) return 'red';
    return 'black';
  }

  return (
    <>
      <Message>
        <Header>
          {date}
          <Icon name='doctor' />
        </Header>
        <ItemDescription>{description}</ItemDescription>
        <Icon name='heart' className={getHeartColor(healthCheckRating)} />
        {diagnosisCodes && (
          <>
            <h4>Diagnosis Codes:</h4>
            <ul>
              {diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosis(code)?.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </Message>
    </>
  );
};

const EntryDetails: React.FC<{ entry: Entry; getDiagnosis: GetDiagnosis }> = ({
  entry,
  getDiagnosis,
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalCard entry={entry} getDiagnosis={getDiagnosis} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareCard entry={entry} getDiagnosis={getDiagnosis} />
      );
    case 'HealthCheck':
      return <HealthCheckCard entry={entry} getDiagnosis={getDiagnosis} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
