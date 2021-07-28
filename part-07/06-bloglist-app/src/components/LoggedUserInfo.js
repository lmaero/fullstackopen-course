import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loggedUserReducer';

const LoggedUserInfo = () => {
  const logoutButtonStyles = 'px-4 py-1 text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 uppercase';

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  if (!loggedUser) {
    return null;
  }

  return (
    <React.StrictMode>
      <>
        <div className="flex justify-self-end mr-5">
          <p className="font-bold mr-5">{ `Welcome ${loggedUser.username}` }</p>
          <button
            className={logoutButtonStyles}
            id="log-out-button"
            type="button"
            onClick={() => dispatch(logoutUser())}
          >
            Log out
          </button>
        </div>
      </>
    </React.StrictMode>
  );
};

export default LoggedUserInfo;
