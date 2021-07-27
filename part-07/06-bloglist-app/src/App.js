import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBlogForm from './components/AddBlogForm';
import BlogsList from './components/BlogsList';
import LoggedUserInfo from './components/LoggedUserInfo';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { verifyLoggedUser } from './reducers/loggedUserReducer';

const App = () => {
  const addBlogFormRef = useRef();

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(verifyLoggedUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Blogs App</h1>

      <Notification />

      { loggedUser === null
        ? <LoginForm />
        : (
          <div>
            <LoggedUserInfo />

            <Togglable
              showButtonLabel="Create new Blog"
              hideButtonLabel="Cancel"
              ref={addBlogFormRef}
            >
              <AddBlogForm
                addBlogFormRef={addBlogFormRef}
              />
            </Togglable>

            <BlogsList />
          </div>
        ) }
    </div>
  );
};

export default App;
