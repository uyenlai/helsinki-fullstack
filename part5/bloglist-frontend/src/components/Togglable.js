import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [createNewVisible, setCreateNewVisible] = useState(false)

  const hideWhenVisible = { display: createNewVisible ? 'none' : '' }
  const showWhenVisible = { display: createNewVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setCreateNewVisible(!createNewVisible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

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
  )
})
Togglable.displayName = 'Togglable'

export default Togglable
