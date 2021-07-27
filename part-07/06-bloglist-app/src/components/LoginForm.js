import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loggedUserReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const eventObject = event;

    const username = eventObject.target.username.value;
    const password = eventObject.target.password.value;

    const credentials = { username, password };

    dispatch(loginUser(credentials));

    eventObject.target.username.value = '';
    eventObject.target.password.value = '';
  };

  return (
    <React.StrictMode>
      <>
        <h2>LoginForm</h2>

        <form onSubmit={handleLogin}>
          <input
            id="username"
            name="username"
            placeholder="Username..."
            required
            type="text"
          />

          <br />

          <input
            id="password"
            name="password"
            placeholder="Password..."
            required
            type="password"
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

export default LoginForm;
