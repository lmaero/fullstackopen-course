import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';

const AddBlogForm = () => {
  const createFormContainerStyles = 'flex flex-col items-center w-auto shadow-md p-5 rounded-lg m-auto h-full';

  const createFormStyles = 'flex items-center space-y-2';

  const inputStyles = 'bg-green-50 p-3 pl-6 pr-6 rounded-full text-green-600 font-semibold focus:outline-none focus:ring focus:border-green-300 m-2';

  const createButtonStyles = 'px-20 py-4 text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 uppercase';

  const title = 'uppercase font-bold text-black text-xl ml-5';

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        <div className={createFormContainerStyles}>
          <h2 className={title}>Create new Blog</h2>
          <form className={createFormStyles} onSubmit={handleSubmit}>
            <input
              id="BlogTitle"
              name="BlogTitle"
              required
              type="text"
              className={inputStyles}
              placeholder="Title"
            />

            <br />

            <input
              id="BlogAuthor"
              name="BlogAuthor"
              required
              type="text"
              className={inputStyles}
              placeholder="Author"
            />

            <br />

            <input
              id="BlogURL"
              name="BlogURL"
              required
              type="url"
              className={inputStyles}
              placeholder="URL"
            />

            <br />

            <button
              className={createButtonStyles}
              type="submit"
              id="create-blog-button"
            >
              Create
            </button>
          </form>
        </div>
      </>
    </React.StrictMode>
  );
};

export default AddBlogForm;
