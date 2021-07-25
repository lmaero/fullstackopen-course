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
  const addBlogFormRef = useRef();

  const [loggedUser, setLoggedUser] = useState(null);

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

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
                addBlogFormRef={addBlogFormRef}
                loggedUser={loggedUser}
              />
            </Togglable>

            <BlogsList loggedUser={loggedUser} />
          </div>
        ) }

    </div>
  );
};

export default App;
