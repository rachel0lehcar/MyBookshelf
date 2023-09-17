import React from 'react'
import { useNavigate } from 'react-router-dom'
import './pagestyles/ReviewNB.css'

function ReviewNB() {
  const navigate = useNavigate();

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
      <button onClick={() => navigate(-1)}>Return to Notes</button>
    </div>
  )
}

export default ReviewNB