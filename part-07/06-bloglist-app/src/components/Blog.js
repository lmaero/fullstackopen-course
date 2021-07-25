import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const Blog = ({
  blog, blogs, setBlogs, loggedUser, incrementLikes,
}) => {
  const {
    id, author, title, url, likes, user,
  } = blog;

  const dispatch = useDispatch();

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

        dispatch(setNotification({
          message: `${title} removed from list`,
          type: 'success',
        }));
      } catch (error) {
        dispatch(setNotification({
          message: error.response.data.error,
          type: 'error',
        }));
      }
    } else {
      dispatch(setNotification({
        message: 'Action canceled by user',
        type: 'error',
      }));
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
        <div style={blogStyle} className="blog">
          { `${title} ${author}` }

          <Togglable
            showButtonLabel="View details"
            hideButtonLabel="Hide details"
          >
            <p className="url">{`URL: ${url}`}</p>
            <p className="likes">
              { `Likes: ${likes}` }
              <button
                id="likes-button"
                type="button"
                className="likesButton"
                onClick={() => incrementLikes(id)}
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
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  blogs: PropTypes.shape({
    content: PropTypes.string.isRequired,
    filter: PropTypes.func.isRequired,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
  loggedUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  incrementLikes: PropTypes.func.isRequired,
};

export default Blog;
