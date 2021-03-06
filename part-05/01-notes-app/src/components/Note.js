import React from 'react';

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <React.StrictMode>
      <>
        <li className="note">
          <span>{note.content}</span>
          <button type="button" onClick={toggleImportance}>{label}</button>
        </li>
      </>
    </React.StrictMode>
  );
};

export default Note;
