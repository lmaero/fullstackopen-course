import PropTypes from 'prop-types';
import React from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const Blog = ({
  blog, blogs, setBlogs, loggedUser, showNotification, incrementLikes
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
        <div style={blogStyle} className='blog'>
          { `${title} ${author}` }

          <Togglable
            showButtonLabel="View details"
            hideButtonLabel="Hide details"
          >
            <p className='url'>{`URL: ${url}`}</p>
            <p className='likes'>
              { `Likes: ${likes}` }
              <button
                type="button"
                className='likesButton'
                onClick={ () => incrementLikes(id) }
              >
                Like
              </button>
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
