import blogService from '../services/blogs';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'ADD_BLOG':
      return [...state, action.data];
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
  const newBlog = await blogService.create(blogObject);

  dispatch({
    type: 'ADD_BLOG',
    data: { ...newBlog, user: { ...loggedUser, name: loggedUser.name } },
  });
};

export default blogsReducer;
