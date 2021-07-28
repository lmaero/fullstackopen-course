import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loggedUserReducer';

const LoginForm = () => {
  const loginFormContainerStyles = 'flex space-y-10 flex-col items-center w-1/4 shadow-md p-10 rounded-lg mt-20 m-auto h-full';

  const loginFormStyles = 'flex flex-col items-center space-y-5';

  const inputStyles = 'bg-green-50 p-4 pl-10 rounded-full text-green-600 font-semibold focus:outline-none focus:ring focus:border-green-300';

  const loginButtonStyles = 'px-20 py-4 text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 uppercase';

  const title = 'font-bold text-black text-xl ml-5';

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
        <div className={loginFormContainerStyles}>
          <h2 className={title}>Login</h2>

          <form className={loginFormStyles} onSubmit={handleLogin}>
            <input
              id="username"
              name="username"
              placeholder="Username..."
              required
              type="text"
              className={inputStyles}
            />

            <br />

            <input
              id="password"
              name="password"
              placeholder="Password..."
              required
              type="password"
              className={inputStyles}
            />

            <br />

            <button
              className={loginButtonStyles}
              id="login-button"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </>
    </React.StrictMode>
  );
};

export default LoginForm;
