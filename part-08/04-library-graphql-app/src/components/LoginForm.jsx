import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
    setPage('authors');
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username
          {' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          Password
          {' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setPage: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default LoginForm;
