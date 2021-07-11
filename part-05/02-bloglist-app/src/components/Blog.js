import React from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const Blog = ({ blog, blogs, setBlogs }) => {
  const {
    id, author, title, url, likes, user,
  } = blog;

  const blogStyle = {
    border: '2px solid #CCCCCC',
    borderRadius: '10px',
    margin: '1rem',
    maxWidth: '400px',
    padding: '1rem',
  };

  async function incrementLikes() {
    const updatedBlog = {
      ...blog,
      user: user ? user.id : null,
    };

    const returnedBlog = await blogService.update(id, updatedBlog);
    const updatedBlogList = blogs.map((b) => (b.id === returnedBlog.id
      ? { ...blog, likes: likes + 1 }
      : b));

    setBlogs(updatedBlogList);
  }

  return (
    <React.StrictMode>
      <>
        <div style={blogStyle}>
          { `${title} ${author}` }

          <Togglable
            showButtonLabel="View details"
            hideButtonLabel="Hide details"
          >
            <p>{`URL: ${url}`}</p>
            <p>
              { `Likes: ${likes}` }
              <button type="button" onClick={incrementLikes}>Like</button>
            </p>
            { user ? <p>{ `User: ${user.name}` }</p> : ''}
          </Togglable>
        </div>
      </>
    </React.StrictMode>
  );
};

export default Blog;
