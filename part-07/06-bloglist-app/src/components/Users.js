import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { readUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const mainTitleStyles = 'm-5 text-center uppercase font-bold text-black text-xl ml-5';

  useEffect(() => {
    dispatch(readUsers());
  }, []);

  return (
    <React.StrictMode>
      <>
        <h2 className={mainTitleStyles}>Users</h2>

        <div className="m-auto w-96">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="bg-green-100 border text-left px-8 py-4">User name</th>
                <th className="bg-green-100 border text-left px-8 py-4">Blogs created</th>
              </tr>
            </thead>

            <tbody>
              { users.map((user) => (
                <tr>
                  <td className="bg-green-50 border text-left px-8 py-4"><Link to={`/users/${user.id}`}>{ user.name }</Link></td>
                  <td className="bg-green-50 border text-left px-8 py-4">{ user.blogs.length }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </React.StrictMode>
  );
};

export default Users;
