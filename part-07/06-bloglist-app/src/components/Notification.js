import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification) {
    const { message, type } = notification;

    return (
      <React.StrictMode>
        <>
          <div className={`notification notification--${type}`}>{message}</div>
        </>
      </React.StrictMode>
    );
  }
  return null;
};

export default Notification;
