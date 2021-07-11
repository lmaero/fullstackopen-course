import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
  const {
    author, title, url, likes, user,
  } = blog;

  const blogStyle = {
    border: '2px solid #CCCCCC',
    borderRadius: '10px',
    margin: '1rem',
    maxWidth: '400px',
    padding: '1rem',
  };

  return (
    <React.StrictMode>
      <>
        <div style={blogStyle}>
          { `${title} ${author}` }

          <Togglable
            showButtonLabel="View details"
            hideButtonLabel="Hide details"
          >
            <p>{`URL: ${url}`}</p>
            <p>
              { `Likes: ${likes}` }
              <button type="button">Like</button>
            </p>
            { user ? <p>{ `User: ${user.name}` }</p> : ''}
          </Togglable>
        </div>
      </>
    </React.StrictMode>
  );
};

export default Blog;
