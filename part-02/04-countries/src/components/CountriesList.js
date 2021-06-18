import React from 'react';

const CountriesList = ({ countries, setFilterValue }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <ul>
          {countries.map(({ alpha3Code, name }) => (
            <li key={alpha3Code}>
              {name}{' '}
              <button type='button' onClick={() => setFilterValue(name)}>
                Show more info
              </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default CountriesList;
