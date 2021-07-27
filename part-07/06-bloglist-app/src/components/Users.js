import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(readUsers());
  }, []);

  return (
    <React.StrictMode>
      <>
        <h2>Users</h2>

        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Blogs created</th>
            </tr>
          </thead>

          <tbody>
            { users.map((user) => (
              <tr key={user.id}>
                <td>{ user.name }</td>
                <td>{ user.blogs.length }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </React.StrictMode>
  );
};

export default Users;
