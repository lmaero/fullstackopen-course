import PropTypes from 'prop-types';
import React from 'react';
import Blog from './Blog';

const BlogsList = ({
  blogs, setBlogs, loggedUser, showNotification, incrementLikes
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
            showNotification={ showNotification }
            incrementLikes={incrementLikes}
          />
        ))}
    </>
  </React.StrictMode>
);

BlogsList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default BlogsList;
