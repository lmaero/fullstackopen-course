import PropTypes from 'prop-types';
import React from 'react';

const Notification = ({ notification }) => {
  const { message, type } = notification;

  return (
    <React.StrictMode>
      <>
        <div className={`notification notification--${type}`}>{message}</div>
      </>
    </React.StrictMode>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Notification;
