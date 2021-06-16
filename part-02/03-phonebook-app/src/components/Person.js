import React from 'react';

const Person = ({ person }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <p>
          {person.name} {person.number}
        </p>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Person;
