import React from 'react';

const Notification = ({ message, type }) => {
  if (message === null) return null;

  return (
    <React.StrictMode>
      <React.Fragment>
        <div className={`${type} notification`}>{message}</div>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Notification;
