import React from 'react';

const Blog = ({ blog }) => (
  <React.StrictMode>
    <>
      <p>{`${blog.title} ${blog.author}`}</p>
    </>
  </React.StrictMode>
);

export default Blog;
