import PropTypes from 'prop-types';
import React from 'react';
import Blog from './Blog';

const BlogsList = ({
  blogs, setBlogs, loggedUser, incrementLikes,
}) => (
  <React.StrictMode>
    <>
      <h2>Blogs</h2>
      { blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            loggedUser={loggedUser}
            incrementLikes={incrementLikes}
          />
        ))}
    </>
  </React.StrictMode>
);

BlogsList.propTypes = {
  blogs: PropTypes.shape({
    content: PropTypes.string.isRequired,
    sort: PropTypes.func.isRequired,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
  loggedUser: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
  incrementLikes: PropTypes.func.isRequired,
};

export default BlogsList;
