import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountriesData(response.data));
  }, []);

  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>Countries Data</h1>

        <Filter filterValue={filterValue} setFilterValue={setFilterValue} />

        <Countries countriesData={countriesData} filterValue={filterValue} />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
