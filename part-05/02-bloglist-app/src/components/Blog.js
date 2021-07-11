import PropTypes from 'prop-types';
import React from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const Blog = ({
  blog, blogs, setBlogs, loggedUser, showNotification,
}) => {
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

  async function deleteBlog() {
    // eslint-disable-next-line no-alert
    const isDeletionConfirmed = window
      .confirm(`Remove blog "${title}" by "${author}"?`);

    if (isDeletionConfirmed) {
      try {
        await blogService.deleteBlog(id);

        const afterDeleteList = blogs.filter((b) => (b.id !== id));
        setBlogs(afterDeleteList);
        showNotification(`${title} removed from list`);
      } catch (error) {
        showNotification(error.response.data.error, 'error');
      }
    } else {
      showNotification('Action canceled by user', 'error');
    }
  }

  function showDeleteButton() {
    const blogUserName = user ? user.name : null;

    if (loggedUser.name === blogUserName) {
      return <button type="button" onClick={deleteBlog}>Delete</button>;
    }
    return null;
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
            { user ? <p>{ `User: ${user.name}` }</p> : '' }
            {showDeleteButton()}
          </Togglable>
        </div>
      </>
    </React.StrictMode>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default Blog;
