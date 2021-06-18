import React from 'react';
import CountriesList from './CountriesList';
import Country from './Country';

const Countries = ({ countriesData, filterValue, setFilterValue }) => {
  function showCountries() {
    if (countriesData.length === 0)
      return <p>Loading countries information...</p>;

    const filteredList = countriesData.filter(({ name }) =>
      name.toLowerCase().includes(filterValue.toLowerCase()),
    );
    const countriesLength = filteredList.length;

    if (countriesLength === 0)
      return <p>No countries found with that filter, please change it</p>;

    if (countriesLength > 10)
      return <p>Too many matches, specify a filter above</p>;

    if (countriesLength > 1 && countriesLength <= 10)
      return (
        <CountriesList
          countries={filteredList}
          setFilterValue={setFilterValue}
        />
      );

    if (countriesLength === 1) return <Country country={filteredList[0]} />;
  }

  return (
    <React.StrictMode>
      <React.Fragment>
        <h2>Countries</h2>

        {showCountries()}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Countries;
