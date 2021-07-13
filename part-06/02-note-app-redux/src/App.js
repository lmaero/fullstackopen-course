import React from 'react';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
});

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2,
  },
});

const App = (props) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>Notes-App Redux</h1>
        <ul>
          {store.getState().map((note) => (
            <li key={note.id}>
              {note.content}{' '}
              <strong>{note.important ? 'important' : ''}</strong>
            </li>
          ))}
        </ul>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
