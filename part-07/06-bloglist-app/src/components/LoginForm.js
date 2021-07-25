import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({ username, password });

      dispatch(setNotification({
        message: `Logged in as ${username}`,
        type: 'success',
      }));

      window
        .localStorage
        .setItem('blogAppLoggedUser', JSON.stringify(loggedUser));

      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(setNotification({
        message: error.response.data.error,
        type: 'error',
      }));
    }
  };

  return (
    <React.StrictMode>
      <>
        <h2>LoginForm</h2>

        <form onSubmit={handleLogin}>
          <input
            id="username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username..."
            required
            type="text"
            value={username}
          />

          <br />

          <input
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password..."
            required
            type="password"
            value={password}
          />

          <br />

          <button
            id="login-button"
            type="submit"
          >
            Login
          </button>
        </form>
      </>
    </React.StrictMode>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
