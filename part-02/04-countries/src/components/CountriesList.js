import React from 'react';

const CountriesList = ({ countries }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <ul>
          {countries.map(({ alpha3Code, name }) => (
            <li key={alpha3Code}>{name}</li>
          ))}
        </ul>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default CountriesList;
