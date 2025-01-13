import React from 'react'
import './Fallback.css'

const Fallback = () => {
    console.log("First Time")
  return (
    <div className="fallback">
      <div className="spinner"></div>
    </div>
  );
}

export default Fallback