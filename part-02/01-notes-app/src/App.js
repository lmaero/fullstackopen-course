import React from 'react';
import Note from './components/Note';

const App = ({ notes }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <div>
          <h1>Notes</h1>

          <ul>
            {notes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </ul>
        </div>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
