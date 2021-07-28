import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'ADD_BLOG':
      return [...state, action.data];
    case 'LIKE_BLOG': {
      const likedBlog = action.data;
      return state
        .map((blog) => (blog.id === likedBlog.id ? likedBlog : blog));
    }
    case 'DELETE_BLOG': {
      const deletedBlogId = action.data.id;

      return state
        .filter((blog) => blog.id !== deletedBlogId);
    }
    case 'COMMENT_BLOG': {
      const commentedBlog = action.data;
      return state
        .map((blog) => (blog.id === commentedBlog.id ? commentedBlog : blog));
    }

    default:
      return state;
  }
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};

export const createBlog = (blogObject, loggedUser) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blogObject);

    dispatch({
      type: 'ADD_BLOG',
      data: { ...newBlog, user: { ...loggedUser, name: loggedUser.name } },
    });

    dispatch(setNotification({
      message: `A new blog ${newBlog.title} by ${newBlog.author} was added`,
      type: 'success',
    }));
  } catch (error) {
    dispatch(setNotification({
      message: error.response.data.error,
      type: 'error',
    }));
  }
};

export const likeBlog = (blogObject) => async (dispatch) => {
  const userIdString = blogObject.user ? blogObject.user.id : null;

  const blogToUpdate = {
    ...blogObject,
    user: userIdString,
    likes: blogObject.likes + 1,
  };

  const updatedBlog = await blogService
    .update(blogObject.id, blogToUpdate);

  dispatch({
    type: 'LIKE_BLOG',
    data: updatedBlog,
  });
};

export const deleteBlog = (blogObject) => async (dispatch) => {
  await blogService.deleteBlog(blogObject.id);

  dispatch({
    type: 'DELETE_BLOG',
    data: blogObject,
  });
};

export const commentBlog = (blogId, comment) => async (dispatch) => {
  try {
    const commentedBlog = await blogService.commentBlog(blogId, comment);

    dispatch({
      type: 'COMMENT_BLOG',
      data: commentedBlog,
    });

    dispatch(setNotification({
      message: `A new comment was added to the blog ${commentedBlog.title}`,
      type: 'success',
    }));
  } catch (error) {
    dispatch(setNotification({
      message: error.response.data.error,
      type: 'error',
    }));
  }
};

export default blogsReducer;
