import PropTypes from 'prop-types';
import React, { useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({ username, password });
      showNotification(`Logged in as ${username}`);

      window
        .localStorage
        .setItem('blogAppLoggedUser', JSON.stringify(loggedUser));

      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      showNotification(error.response.data.error, 'error');
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

          <button id="login-button" type="submit">Login</button>
        </form>
      </>
    </React.StrictMode>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default LoginForm;
