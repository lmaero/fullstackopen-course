import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const AddBlogForm = ({ addBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogURL, setBlogURL] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogURL,
      };

      addBlog(newBlog);
      setBlogTitle('');
      setBlogAuthor('');
      setBlogURL('');
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
            onChange={(event) => setBlogTitle(event.target.value)}
            required
            type="text"
            value={blogTitle}
          />

          <br />

          {'Author: '}
          <input
            id="BlogAuthor"
            name="BlogAuthor"
            onChange={(event) => setBlogAuthor(event.target.value)}
            required
            type="text"
            value={blogAuthor}
          />

          <br />

          {'URL: '}
          <input
            id="BlogURL"
            name="BlogURL"
            onChange={(event) => setBlogURL(event.target.value)}
            required
            type="url"
            value={blogURL}
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
  addBlog: PropTypes.func.isRequired,
};

export default AddBlogForm;
