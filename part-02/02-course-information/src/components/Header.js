import React from 'react';

const Header = ({ courseName }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <h2>{courseName}</h2>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Header;
