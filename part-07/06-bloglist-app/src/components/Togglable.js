import PropTypes from 'prop-types';
import React, { useImperativeHandle, useState } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <React.StrictMode>
      <>
        <div style={hideWhenVisible} className="shownByDefault">
          <button
            type="button"
            onClick={toggleVisibility}
          >
            { props.showButtonLabel }
          </button>
        </div>

        <div style={showWhenVisible} className="hiddenByDefault">
          { props.children }
          <button
            type="button"
            onClick={toggleVisibility}
          >
            {props.hideButtonLabel}
          </button>
        </div>
      </>
    </React.StrictMode>
  );
});

Togglable.propTypes = {
  hideButtonLabel: PropTypes.string.isRequired,
  showButtonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
