import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
              <tr>
                <td><Link to={`/users/${user.id}`}>{ user.name }</Link></td>
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
