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
      return <button type="button" onClick={deleteSelectedBlog}>Delete</button>;
    }
    return null;
  }

  if (!blog) {
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
        <h2>{ `${title} by ${author}` }</h2>

        <p className="url">
          {'URL: '}
          <a href={url}>{url}</a>
        </p>

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
        { showDeleteButton() }

        <h3>Comments</h3>
        <form onSubmit={createComment}>
          <input
            name="comment"
            type="text"
            placeholder="Comment..."
            required
          />

          <button type="submit">Add</button>
        </form>
        <ul>
          {blog.comments
            .map((comment) => (
              <li key={comment}>{ comment }</li>
            )) }
        </ul>
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
