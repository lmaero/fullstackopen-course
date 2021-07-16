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

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    if (window.timeoutId) {
      clearTimeout(window.timeoutId);
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    window.timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export default notificationReducer;
