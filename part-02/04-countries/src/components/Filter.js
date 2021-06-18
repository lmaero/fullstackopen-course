import React from 'react';

const Filter = ({ filterValue, setFilterValue }) => {
  function handleFilterChange(event) {
    setFilterValue(event.target.value);
  }

  return (
    <React.StrictMode>
      <React.Fragment>
        <h2>Filter</h2>
        <label htmlFor='filter'>Find countries: </label>
        <input
          autoFocus
          id='filter'
          onChange={handleFilterChange}
          type='text'
          value={filterValue}
        />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Filter;
