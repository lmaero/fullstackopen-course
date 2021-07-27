import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import blogsReducer from './reducers/blogsReducer';
import loggedUserReducer from './reducers/loggedUserReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  loggedUser: loggedUserReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
