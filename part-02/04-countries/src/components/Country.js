import React from 'react';

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country;

  return (
    <React.StrictMode>
      <React.Fragment>
        <h3>{name}</h3>

        <p>
          <b>Capital: </b>
          {capital}
        </p>

        <p>
          <b>Population: </b>
          {population.toLocaleString()}
        </p>

        <h4>Languages</h4>
        <ul>
          {languages.map(({ name, iso639_2 }) => (
            <li key={iso639_2}>{name}</li>
          ))}
        </ul>

        <img src={flag} alt={`${name}'s flag`} style={{ width: '150px' }} />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Country;
