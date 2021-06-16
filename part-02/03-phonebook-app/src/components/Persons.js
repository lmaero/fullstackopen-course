import React from 'react';
import Person from './Person';

const Persons = ({ filterNumbersList }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        {filterNumbersList().map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Persons;
