import { useApolloClient, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
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
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={logout}
      >
        logout
      </button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

Notify.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default App;
