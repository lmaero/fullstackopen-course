import PropTypes from 'prop-types';
import React, { useImperativeHandle, useState } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const createButtonStyles = 'px-10 py-2 text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 uppercase';

  const cancelButtonStyles = 'px-10 py-2 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 uppercase';

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
            className={createButtonStyles}
            type="button"
            onClick={toggleVisibility}
          >
            { props.showButtonLabel }
          </button>
        </div>

        <div style={showWhenVisible} className="hiddenByDefault">
          { props.children }
          <button
            className={cancelButtonStyles}
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
