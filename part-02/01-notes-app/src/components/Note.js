import React from 'react';

const Note = ({ note }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <li>{note.content}</li>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Note;
