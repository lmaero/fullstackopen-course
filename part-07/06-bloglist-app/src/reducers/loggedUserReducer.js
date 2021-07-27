import blogService from '../services/blogs';
import loginService from '../services/login';
import { setNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'EXISTING_LOGIN': {
      return action.data;
    }

    case 'LOG_IN': {
      const loggedUser = action.data;
      window
        .localStorage
        .setItem('blogAppLoggedUser', JSON.stringify(loggedUser));

      blogService.setToken(loggedUser.token);
      return loggedUser;
    }

    case 'LOG_OUT': {
      window.localStorage.removeItem('blogAppLoggedUser');
      blogService.setToken(null);
      return null;
    }

    default:
      return state;
  }
};

export const verifyLoggedUser = () => async (dispatch) => {
  const loggedUserJSON = window
    .localStorage
    .getItem('blogAppLoggedUser');

  if (loggedUserJSON) {
    const parsedLoggedUser = JSON.parse(loggedUserJSON);
    blogService.setToken(parsedLoggedUser.token);

    dispatch({
      type: 'EXISTING_LOGIN',
      data: parsedLoggedUser,
    });
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const loggedUser = await loginService.login(credentials);
    dispatch({
      type: 'LOG_IN',
      data: loggedUser,
    });

    dispatch(setNotification({
      message: 'Logged in as ',
      type: 'success',
    }));
  } catch (error) {
    dispatch(setNotification({
      message: error.response.data.error,
      type: 'error',
    }));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: 'LOG_OUT',
  });

  dispatch(setNotification({
    message: 'Logged out',
    type: 'success',
  }));
};

export default userReducer;
