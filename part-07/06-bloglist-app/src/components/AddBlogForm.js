import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const AddBlogForm = ({ addBlogFormRef, loggedUser }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    addBlogFormRef.current.toggleVisibility();

    const eventObject = event;

    try {
      const newBlog = {
        title: eventObject.target.BlogTitle.value,
        author: eventObject.target.BlogAuthor.value,
        url: eventObject.target.BlogURL.value,
        user: loggedUser,
      };

      dispatch(createBlog(newBlog, loggedUser));

      dispatch(setNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} was added`,
        type: 'success',
      }));

      eventObject.target.BlogTitle.value = '';
      eventObject.target.BlogAuthor.value = '';
      eventObject.target.BlogURL.value = '';
    } catch (error) {
      dispatch(setNotification({
        message: error.response.data.error,
        type: 'error',
      }));
    }
  };

  return (
    <React.StrictMode>
      <>
        <h2>Create new Blog</h2>
        <form onSubmit={handleSubmit}>
          {'Title: '}
          <input
            id="BlogTitle"
            name="BlogTitle"
            required
            type="text"
          />

          <br />

          {'Author: '}
          <input
            id="BlogAuthor"
            name="BlogAuthor"
            required
            type="text"
          />

          <br />

          {'URL: '}
          <input
            id="BlogURL"
            name="BlogURL"
            required
            type="url"
          />

          <br />

          <button
            id="create-blog-button"
            type="submit"
          >
            Create
          </button>
        </form>
      </>
    </React.StrictMode>
  );
};

AddBlogForm.propTypes = {
  addBlogFormRef: PropTypes.func.isRequired,
  loggedUser: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default AddBlogForm;
