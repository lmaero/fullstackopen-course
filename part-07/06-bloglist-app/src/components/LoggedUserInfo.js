import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loggedUserReducer';

const LoggedUserInfo = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  if (!loggedUser) {
    return null;
  }

  return (
    <React.StrictMode>
      <>
        <p>{ `${loggedUser.username} logged in` }</p>
        <button
          id="log-out-button"
          type="button"
          onClick={() => dispatch(logoutUser())}
        >
          Log out
        </button>
      </>
    </React.StrictMode>
  );
};

export default LoggedUserInfo;
