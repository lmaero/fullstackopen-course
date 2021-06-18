import React from 'react';
import Person from './Person';

const Persons = ({ filterNumbersList, deletePerson }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        {filterNumbersList().map((person) => (
          <Person
            key={person.name}
            person={person}
            deletePerson={deletePerson}
          />
        ))}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Persons;
