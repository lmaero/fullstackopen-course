import React from 'react';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <div>
          filter shown with:{' '}
          <input autoFocus value={filter} onChange={handleFilterChange} />
        </div>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Filter;
