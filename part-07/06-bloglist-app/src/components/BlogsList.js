import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeBlogs } from '../reducers/blogsReducer';

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => { dispatch(initializeBlogs()); }, []);

  const blogStyle = {
    border: '2px solid #CCCCCC',
    borderRadius: '10px',
    margin: '1rem',
    maxWidth: '400px',
    padding: '1rem',
  };

  return (
    <>
      <h2>Blogs</h2>
      { blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <p style={blogStyle}>{ blog.title }</p>
          </Link>
        )) }
    </>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogsList;
