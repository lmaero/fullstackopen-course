import React from 'react';
import Blog from './Blog';

const BlogsList = ({
  blogs, setBlogs, loggedUser, showNotification,
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
            showNotification={showNotification}
          />
        ))}
    </>
  </React.StrictMode>
);

export default BlogsList;
