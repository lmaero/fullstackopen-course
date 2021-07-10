import React, { useEffect, useState } from 'react';
import BlogsList from './components/BlogsList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(
    {
      message: '',
      type: 'success',
    },
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogAppLoggedUser');

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
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

  return (
    <div>
      <h1>Blogs App</h1>

      { notification.message
        ? <Notification notification={notification} />
        : null }

      { user === null
        ? (
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setUser={setUser}
            showNotification={showNotification}
          />
        )
        : (
          <div>
            <p>{ `${user.username} logged in` }</p>
            <button type="button" onClick={handleLogout}>Log out</button>
            <BlogsList blogs={blogs} />
          </div>
        ) }

    </div>
  );
};

export default App;
