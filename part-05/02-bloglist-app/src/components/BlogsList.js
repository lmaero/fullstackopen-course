import React from 'react';
import Blog from './Blog';

const BlogsList = ({ blogs, setBlogs }) => (
  <React.StrictMode>
    <>
      <h2>Blogs</h2>
      { blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      )) }
    </>
  </React.StrictMode>
);

export default BlogsList;
