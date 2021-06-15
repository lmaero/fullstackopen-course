import React from 'react';

const Total = ({ courseParts }) => {
  const total = courseParts.reduce((acc, curr) => (acc += curr.exercises), 0);

  return (
    <React.StrictMode>
      <React.Fragment>
        <p>
          <b>Total of {total} exercises</b>
        </p>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Total;
