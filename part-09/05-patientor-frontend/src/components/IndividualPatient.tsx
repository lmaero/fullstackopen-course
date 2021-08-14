import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Patient } from '../types';

const IconGender = ({ patient }: { patient: Patient }) => {
  if (patient.gender === 'male') return <Icon name='mars' />;
  if (patient.gender === 'female') return <Icon name='venus' />;
  return <Icon name='genderless' />;
};

const IndividualUser = () => {
  const [{ patient }, dispatch] = useStateValue();
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

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <React.StrictMode>
      <>
        <h2>
          {patient.name} <IconGender patient={patient} />
        </h2>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
      </>
    </React.StrictMode>
  );
};

export default IndividualUser;
