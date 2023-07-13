import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, ref) => {
  const [createNewVisible, setCreateNewVisible] = useState(false);

  const hideWhenVisible = { display: createNewVisible ? 'none' : '' };
  const showWhenVisible = { display: createNewVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setCreateNewVisible(!createNewVisible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
