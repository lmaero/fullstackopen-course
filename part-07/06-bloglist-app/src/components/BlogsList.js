import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeBlogs } from '../reducers/blogsReducer';

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const title = 'm-5 text-center uppercase font-bold text-black text-xl ml-5';
  const blogCardsContainer = 'grid grid-cols-4';
  const blogCard = 'uppercase font-light bg-green-50 p-3 m-3 border-t-4 border-green-300 rounded hover:text-black hover:bg-green-100 transition duration-500';

  useEffect(() => { dispatch(initializeBlogs()); }, []);

  return (
    <>
      <h2 className={title}>Blogs</h2>
      <div className={blogCardsContainer}>
        { blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link to={`/blogs/${blog.id}`}>
              <p className={blogCard}>{ blog.title }</p>
            </Link>
          )) }
      </div>
    </>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogsList;
