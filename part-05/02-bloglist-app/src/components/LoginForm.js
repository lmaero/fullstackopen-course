import React from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  showNotification,
}) => {
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
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username..."
            required
            type="text"
            value={username}
          />

          <br />

          <input
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password..."
            required
            type="password"
            value={password}
          />

          <br />

          <button type="submit">Login</button>
        </form>
      </>
    </React.StrictMode>
  );
};

export default LoginForm;
