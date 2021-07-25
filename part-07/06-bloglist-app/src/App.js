import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBlogForm from './components/AddBlogForm';
import BlogsList from './components/BlogsList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notificationReducer';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const addBlogFormRef = useRef();

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window
      .localStorage
      .getItem('blogAppLoggedUser');

    if (loggedUserJSON) {
      const parsedLoggedUser = JSON.parse(loggedUserJSON);
      setLoggedUser(parsedLoggedUser);
      blogService.setToken(parsedLoggedUser.token);
    }
  }, []);

  function handleLogout() {
    window.localStorage.removeItem('blogAppLoggedUser');
    setLoggedUser(null);

    dispatch(setNotification({
      message: 'Logged out',
      type: 'success',
    }));
  }

  async function addBlog(newBlog) {
    addBlogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await blogService.create(newBlog);

      dispatch(setNotification({
        message: `A new blog ${createdBlog.title} by ${createdBlog.author} was added`,
        type: 'success',
      }));

      setBlogs(blogs.concat({ ...createdBlog, user: { name: loggedUser.name } }));
    } catch (error) {
      dispatch(setNotification({
        message: error.response.data.error,
        type: 'error',
      }));
    }
  }

  async function incrementLikes(id) {
    const blogToUpdate = blogs.find((blog) => blog.id === id);
    const { user, likes } = blogToUpdate;

    const updatedBlog = {
      ...blogToUpdate,
      user: user ? blogToUpdate.user.id : null,
    };

    const returnedBlog = await blogService.update(id, updatedBlog);
    const updatedBlogList = blogs.map((b) => (b.id === returnedBlog.id
      ? { ...blogToUpdate, likes: likes + 1 }
      : b));

    setBlogs(updatedBlogList);
  }

  return (
    <div>
      <h1>Blogs App</h1>

      { notification
        ? <Notification notification={notification} />
        : null }

      { loggedUser === null
        ? (
          <LoginForm
            setUser={setLoggedUser}
          />
        )
        : (
          <div>
            <p>{ `${loggedUser.username} logged in` }</p>
            <button
              id="log-out-button"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>

            <Togglable
              showButtonLabel="Create new Blog"
              hideButtonLabel="Cancel"
              ref={addBlogFormRef}
            >
              <AddBlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                addBlog={addBlog}
              />
            </Togglable>

            <BlogsList
              blogs={blogs}
              setBlogs={setBlogs}
              loggedUser={loggedUser}
              incrementLikes={incrementLikes}
            />
          </div>
        ) }

    </div>
  );
};

export default App;
