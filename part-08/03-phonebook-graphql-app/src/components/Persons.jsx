import { useLazyQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FIND_PERSON } from '../queries';

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState(null);

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street}
          {' '}
          {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button
          type="button"
          onClick={() => setPerson(null)}
        >
          close
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name}
          {' '}
          {p.phone}
          <button
            type="button"
            onClick={() => showPerson(p.name)}
          >
            show address
          </button>
        </div>
      ))}
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.shape([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  ]).isRequired,
};

export default Persons;
