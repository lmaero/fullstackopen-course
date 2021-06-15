import React from 'react';
import Part from './Part';

const Content = ({ courseParts }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        {courseParts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Content;
