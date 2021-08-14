import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal/AddEntryModal';
import { apiBaseUrl } from '../constants';
import { addEntry, setDiagnoses, setPatient, useStateValue } from '../state';
import { Diagnosis, Entry, Patient } from '../types';
import EntryDetails from './Entries';

const IconGender = ({ patient }: { patient: Patient }) => {
  if (patient.gender === 'male') return <Icon name='mars' />;
  if (patient.gender === 'female') return <Icon name='venus' />;
  return <Icon name='genderless' />;
};

const IndividualUser = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values,
      );
      dispatch(addEntry(patient, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <React.StrictMode>
      <>
        <h2>
          {patient.name} <IconGender patient={patient} />
        </h2>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>

        <Button onClick={() => openModal()}>Add New Entry</Button>

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />

        {patient.entries.length !== 0 && (
          <>
            <h3>Entries</h3>
            {patient.entries.map((entry) => (
              <EntryDetails
                key={entry.id}
                entry={entry}
                getDiagnosis={getDiagnosis}
              />
            ))}
          </>
        )}
      </>
    </React.StrictMode>
  );
};

export default IndividualUser;
