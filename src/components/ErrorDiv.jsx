import React from 'react'

const ErrorDiv = ({component}) => {

  return (
    <div className="error-div">
      <p>{component}</p>
    </div>
  )
}

export default ErrorDiv
