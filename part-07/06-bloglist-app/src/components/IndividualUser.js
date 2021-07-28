import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IndividualUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  const mainTitleStyles = 'm-5 text-center uppercase font-bold text-black text-xl ml-5';

  const secondaryTitleStyles = 'm-5 text-left uppercase font-bold text-black text-xl ml-5';

  const blogsList = 'ml-10 flex flex-col space-y-3 text-gray-600';

  if (!user) {
    return null;
  }

  return (
    <React.StrictMode>
      <>
        <h2 className={mainTitleStyles}>{ user.name }</h2>

        <h3 className={secondaryTitleStyles}>Added blogs</h3>
        <ul className={blogsList}>
          { user.blogs.map((blog) => (
            <li key={blog.id}>{ blog.title }</li>
          ))}
        </ul>
      </>
    </React.StrictMode>
  );
};

export default IndividualUser;
