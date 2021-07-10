import React, { useState } from 'react';
import blogService from '../services/blogs';

const AddBlogForm = ({ blogs, setBlogs, showNotification }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogURL, setBlogURL] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogURL,
      };

      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setBlogTitle('');
      setBlogAuthor('');
      setBlogURL('');
    } catch (error) {
      showNotification(error.response.data.error, 'error');
    }
  };

  return (
    <React.StrictMode>
      <>
        <h2>Create new Blog</h2>
        <form onSubmit={handleSubmit}>
          {'Title: '}
          <input
            name="BlogTitle"
            onChange={(event) => setBlogTitle(event.target.value)}
            required
            type="text"
            value={blogTitle}
          />

          <br />

          {'Author: '}
          <input
            name="BlogAuthor"
            onChange={(event) => setBlogAuthor(event.target.value)}
            required
            type="text"
            value={blogAuthor}
          />

          <br />

          {'URL: '}
          <input
            name="BlogURL"
            onChange={(event) => setBlogURL(event.target.value)}
            required
            type="url"
            value={blogURL}
          />

          <br />

          <button type="submit">Create</button>
        </form>
      </>
    </React.StrictMode>
  );
};

export default AddBlogForm;
