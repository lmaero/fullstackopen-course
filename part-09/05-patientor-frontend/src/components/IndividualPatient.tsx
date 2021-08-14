import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setDiagnoses, setPatient, useStateValue } from '../state';
import { Diagnosis, Patient } from '../types';

const IconGender = ({ patient }: { patient: Patient }) => {
  if (patient.gender === 'male') return <Icon name='mars' />;
  if (patient.gender === 'female') return <Icon name='venus' />;
  return <Icon name='genderless' />;
};

const IndividualUser = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!patient || patient.id !== id) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`,
          );
          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`,
        );
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  if (!patient) {
    return <p>Loading...</p>;
  }

  if (!diagnoses) {
    return <p>Loading...</p>;
  }

  function getDiagnosis(code: string) {
    return diagnoses.find((diagnose) => diagnose.code === code);
  }

  return (
    <React.StrictMode>
      <>
        <h2>
          {patient.name} <IconGender patient={patient} />
        </h2>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>

        {patient.entries.length !== 0 && (
          <>
            <h3>Entries</h3>
            {patient.entries.map((entry) => (
              <>
                <p key={entry.id}>
                  {entry.date} {entry.description}
                </p>

                {entry.diagnosisCodes && (
                  <>
                    <h4>Diagnosis Codes:</h4>
                    <ul>
                      {entry.diagnosisCodes.map((code) => (
                        <li key={code}>
                          {code} {getDiagnosis(code)?.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            ))}
          </>
        )}
      </>
    </React.StrictMode>
  );
};

export default IndividualUser;
