import React from 'react';
import Blog from './Blog';

const BlogsList = ({ blogs }) => (
  <React.StrictMode>
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  </React.StrictMode>
);

export default BlogsList;
