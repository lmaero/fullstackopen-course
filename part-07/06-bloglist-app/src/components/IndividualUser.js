import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IndividualUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  return (
    <React.StrictMode>
      <>
        <h2>{ user.name }</h2>

        <h3>Added blogs</h3>
        <ul>
          { user.blogs.map((blog) => (
            <li key={blog.id}>{ blog.title }</li>
          ))}
        </ul>
      </>
    </React.StrictMode>
  );
};

export default IndividualUser;
