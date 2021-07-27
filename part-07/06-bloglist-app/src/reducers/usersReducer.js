import usersService from '../services/users';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'READ_USERS':
      return action.data;
    default:
      return state;
  }
};

export const readUsers = () => async (dispatch) => {
  const users = await usersService.getUsers();
  dispatch({
    type: 'READ_USERS',
    data: users,
  });
};

export default userReducer;
