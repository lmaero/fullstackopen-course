import React from 'react';

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <React.StrictMode>
      <React.Fragment>
        <li className='note'>
          {note.content}
          <button onClick={toggleImportance}>{label}</button>
        </li>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Note;
