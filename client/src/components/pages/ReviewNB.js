import React from 'react'
import './pagestyles/ReviewNB.css'

function ReviewNB() {
  return (
    <div className='page-content reviewnb-page'>
      <div><h2>Image:</h2></div>
      <div><h2>Title:</h2></div>
      <div><h2>Author(s):</h2></div>
      <div><h2>Genre(s):</h2></div>
      <div><h2>Finished:</h2></div>
      <div>
        <h2>Description:</h2>
        <textarea className='review-text'></textarea>
      </div>
      <div>
        <h2>Notes:</h2>
        <textarea className='review-text'></textarea>
      </div>

    </div>
  )
}

export default ReviewNB