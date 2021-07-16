const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timeoutId;

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export default notificationReducer;
