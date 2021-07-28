import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.loggedUser);
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);

  const mainTitleStyles = 'm-5 text-center uppercase font-bold text-black text-xl ml-5';

  const secondaryTitleStyles = 'm-5 text-center uppercase font-bold text-black text-xl ml-5';

  const infoStylesContainer = 'bg-green-50 w-1/4 m-auto rounded p-5 flex flex-col space-y-5';
  const buttonStyles = 'p-2 m-2 text-sm text-green-600 font-semibold rounded border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-green-600 focus:ring-offset-2 uppercase';
  const cancelButtonStyles = 'p-2 m-2 text-sm text-red-600 font-semibold rounded border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-red-600 focus:ring-offset-2 uppercase w-36 self-center';
  const inputStyles = 'bg-green-50 p-3 pl-6 pr-6 rounded-full text-green-600 font-semibold focus:outline-none focus:ring focus:border-green-300 m-2';
  const commentsContainerStyles = 'flex flex-col m-auto w-1/2 space-y-2 items-center';
  const commentsList = 'flex flex-col space-y-3 text-gray-400';

  if (!blog) {
    return null;
  }

  const {
    title, author, likes, url, user,
  } = blog;

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
      return <button className={cancelButtonStyles} type="button" onClick={deleteSelectedBlog}>Delete</button>;
    }
    return null;
  }

  function createComment(event) {
    event.preventDefault();
    const eventObject = event;

    const commentObject = { content: eventObject.target.comment.value };
    dispatch(commentBlog(id, commentObject));

    eventObject.target.comment.value = '';
  }

  return (
    <React.StrictMode>
      <>
        <h2 className={mainTitleStyles}>{ `${title} by ${author}` }</h2>

        <div className={infoStylesContainer}>
          <p className="url">
            {'URL: '}
            <a href={url}>{url}</a>
          </p>

          <p className="likes">
            { `Likes: ${likes}` }
            <button
              className={buttonStyles}
              id="likes-button"
              type="button"
              onClick={() => dispatch(likeBlog(blog))}
            >
              Like
            </button>
          </p>
          { user ? <p>{ `User: ${user.name}` }</p> : '' }
          { showDeleteButton() }
        </div>

        <h3 className={secondaryTitleStyles}>Comments</h3>

        <div className={commentsContainerStyles}>
          <form onSubmit={createComment}>
            <input
              className={inputStyles}
              name="comment"
              type="text"
              placeholder="Comment..."
              required
            />

            <button className={buttonStyles} type="submit">Add</button>
          </form>
          <ul className={commentsList}>
            {blog.comments
              .map((comment) => (
                <li key={comment}>{ comment }</li>
              )) }
          </ul>
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
