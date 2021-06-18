import React from 'react';

const Notification = ({ message }) => {
  if (message === null) return null;

  return (
    <React.StrictMode>
      <React.Fragment>
        <div className='error'>{message}</div>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Notification;
