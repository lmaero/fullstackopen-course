import React from 'react';

const Person = ({ person, deletePerson }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <p>
          {person.name} {person.number}{' '}
          <button type='button' onClick={() => deletePerson(person)}>
            delete
          </button>
        </p>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Person;
