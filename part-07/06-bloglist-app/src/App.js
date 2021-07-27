import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import IndividualUser from './components/IndividualUser';
import LoggedUserInfo from './components/LoggedUserInfo';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Users from './components/Users';
import { verifyLoggedUser } from './reducers/loggedUserReducer';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(verifyLoggedUser());
  }, []);

  return (
    <>
      <h1>Blogs App</h1>
      <Notification />

      { loggedUser === null
        ? <LoginForm />
        : (
          <>
            <LoggedUserInfo />

            <Switch>
              <Route path="/users/:id" component={IndividualUser} />
              <Route path="/users" component={Users} />
              <Route path="/" component={Home} />
            </Switch>
          </>
        ) }
    </>
  );
};

export default App;
