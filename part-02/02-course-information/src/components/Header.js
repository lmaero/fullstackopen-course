import React from 'react';

const Header = ({ courseName }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>{courseName}</h1>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Header;
