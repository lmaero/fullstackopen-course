import React from 'react';

const Notification = ({ notification }) => {
  const { message, type } = notification;

  return (
    <React.StrictMode>
      <>
        <div className={`notification--${type} notification`}>{message}</div>
      </>
    </React.StrictMode>
  );
};

export default Notification;
