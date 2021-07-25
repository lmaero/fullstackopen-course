const notificationReducer = (state = {}, action) => {
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

export const setNotification = (notification) => async (dispatch) => {
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
  }, 5000);
};

export default notificationReducer;
