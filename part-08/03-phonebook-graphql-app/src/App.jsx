import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import PhoneForm from './components/PhoneForm';
import { ALL_PERSONS } from './queries';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  );
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm notify={notify} />
    </div>
  );
};

Notify.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default App;
