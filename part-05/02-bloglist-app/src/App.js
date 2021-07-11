import React, { useEffect, useRef, useState } from 'react';
import AddBlogForm from './components/AddBlogForm';
import BlogsList from './components/BlogsList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
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
      const parsedLoggedUser = JSON.parse(loggedUserJSON);
      setLoggedUser(parsedLoggedUser);
      blogService.setToken(parsedLoggedUser.token);
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
    setLoggedUser(null);
    showNotification('Logged out');
  }

  async function addBlog(newBlog) {
    addBlogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await blogService.create(newBlog);
      showNotification(
        `A new blog ${createdBlog.title} by ${createdBlog.author} was added`,
      );

      setBlogs(blogs.concat({ ...createdBlog, user: { name: loggedUser.name } }));
    } catch (error) {
      showNotification(error.response.data.error, 'error');
    }
  }

  async function incrementLikes(id) {
    const blogToUpdate = blogs.find(blog => blog.id === id);
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

      { notification.message
        ? <Notification notification={notification} />
        : null }

      { loggedUser === null
        ? (
          <LoginForm
            setUser={setLoggedUser}
            showNotification={showNotification}
          />
        )
        : (
          <div>
            <p>{ `${loggedUser.username} logged in` }</p>
            <button type="button" onClick={handleLogout}>Log out</button>

            <Togglable
              showButtonLabel="Create new Blog"
              hideButtonLabel="Cancel"
              ref={addBlogFormRef}
            >
              <AddBlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                showNotification={showNotification}
                addBlog={addBlog}
              />
            </Togglable>

            <BlogsList
              blogs={blogs}
              setBlogs={setBlogs}
              loggedUser={loggedUser}
              showNotification={showNotification}
              incrementLikes={incrementLikes}
            />
          </div>
        ) }

    </div>
  );
};

export default App;
