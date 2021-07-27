import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from '../reducers/blogsReducer';
import Blog from './Blog';

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => { dispatch(initializeBlogs()); }, []);

  return (
    <>
      <h2>Blogs</h2>
      { blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogsList;
