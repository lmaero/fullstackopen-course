import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
  const {
    author,
    title,
    url,
    likes,
    user,
  } = blog;

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const blogStyle = {
    border: '2px solid #CCCCCC',
    borderRadius: '10px',
    margin: '1rem',
    maxWidth: '400px',
    padding: '1rem',
  };

  function deleteSelectedBlog() {
    // eslint-disable-next-line no-alert
    const isDeletionConfirmed = window
      .confirm(`Remove blog "${title}" by "${author}"?`);

    if (isDeletionConfirmed) {
      try {
        dispatch(deleteBlog(blog));

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
    const blogUserName = user ? user.username : null;

    if (loggedUser.username === blogUserName) {
      return <button type="button" onClick={deleteSelectedBlog}>Delete</button>;
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
                onClick={() => dispatch(likeBlog(blog))}
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
      id: PropTypes.string,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Blog;
