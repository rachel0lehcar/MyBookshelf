import React, { useState } from 'react'
import './ProgressBar.css'

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const handleButtonClick = () => {
    if(progress < 100) {
      setProgress(progress + 20);
    }
  }

  const handleButtonReset = () => {
    setProgress(0);
  }

  const getColor = () => {
    if(progress < 40) {
      return "#ff0000";
    }
    else if (progress < 70) {
      return "#ffa500";
    }
    else {
      return "#2ecc71";
    }
  };

  return (
    <div className="pb-container">
      <span className="pb-line">
        <div className='progress-bar'>
          <div className="progress-bar-fill" 
            style={ {width: `${progress}%`, backgroundColor: getColor() }}
          >

          </div>
        </div>
        <h3 className="status">ON TRACK</h3>
      </span>
      <div className="progress-label">{progress}%</div>
      {/*<div className="progress-label">2 out of 24 Books</div>*/}
      <button className="pb-button"onClick={handleButtonClick}>Progress</button>
      <button className="pb-button"onClick={handleButtonReset}>Reset</button>
    </div>
  )
}

export default ProgressBar