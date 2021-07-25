import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from '../reducers/blogsReducer';
import Blog from './Blog';

const BlogsList = ({ loggedUser, incrementLikes }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => { dispatch(initializeBlogs()); }, [dispatch]);

  return (
    <>
      <h2>Blogs</h2>
      { blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedUser={loggedUser}
            incrementLikes={incrementLikes}
          />
        )) }
    </>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.shape({
    content: PropTypes.string.isRequired,
    sort: PropTypes.func.isRequired,
  }).isRequired,
  loggedUser: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
  incrementLikes: PropTypes.func.isRequired,
};

export default BlogsList;
