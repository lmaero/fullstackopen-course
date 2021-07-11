import React, { useEffect, useRef, useState } from 'react';
import AddBlogForm from './components/AddBlogForm';
import BlogsList from './components/BlogsList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const addBlogFormRef = useRef();
  const [notification, setNotification] = useState(
    {
      message: '',
      type: 'success',
    },
  );

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
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  function showNotification(message, type = 'success') {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({});
    }, 5000);
  }

  function handleLogout() {
    window.localStorage.removeItem('blogAppLoggedUser');
    setUser(null);
    showNotification('Logged out');
  }

  async function addBlog(newBlog) {
    addBlogFormRef.current.toggleVisibility();
    const createdBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(createdBlog));
  }

  return (
    <div>
      <h1>Blogs App</h1>

      { notification.message
        ? <Notification notification={notification} />
        : null }

      { user === null
        ? (
          <LoginForm
            setUser={setUser}
            showNotification={showNotification}
          />
        )
        : (
          <div>
            <p>{ `${user.username} logged in` }</p>
            <button type="button" onClick={handleLogout}>Log out</button>

            <Togglable
              buttonLabel="Create new Blog"
              ref={addBlogFormRef}
            >
              <AddBlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                showNotification={showNotification}
                addBlog={addBlog}
              />
            </Togglable>

            <BlogsList blogs={blogs} />
          </div>
        ) }

    </div>
  );
};

export default App;
