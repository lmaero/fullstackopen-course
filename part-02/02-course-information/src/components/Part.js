import React from 'react';

const Part = ({ part }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <p>
          {part.name} {part.exercises}
        </p>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Part;
