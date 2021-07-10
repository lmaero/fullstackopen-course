import React from 'react';

const Notification = ({ message }) => {
  if (message === null) return null;

  return (
    <React.StrictMode>
      <>
        <div className="error">{message}</div>
      </>
    </React.StrictMode>
  );
};

export default Notification;
