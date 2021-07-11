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
        <div style={hideWhenVisible}>
          <button
            type="button"
            onClick={toggleVisibility}
          >
            { props.showButtonLabel }
          </button>
        </div>

        <div style={showWhenVisible}>
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

export default Togglable;
