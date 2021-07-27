import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';

const AddBlogForm = ({ addBlogFormRef }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    addBlogFormRef.current.toggleVisibility();

    const eventObject = event;

    const newBlog = {
      title: eventObject.target.BlogTitle.value,
      author: eventObject.target.BlogAuthor.value,
      url: eventObject.target.BlogURL.value,
      user: loggedUser,
    };

    dispatch(createBlog(newBlog, loggedUser));

    eventObject.target.BlogTitle.value = '';
    eventObject.target.BlogAuthor.value = '';
    eventObject.target.BlogURL.value = '';
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
};

export default AddBlogForm;
