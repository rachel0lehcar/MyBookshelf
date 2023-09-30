import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './pagestyles/ReviewNB.css'

function ReviewNB() {
  const navigate = useNavigate();
  const [title, setTitle] = useState(sessionStorage.getItem('title'));
  const [authors, setAuthors] = useState(sessionStorage.getItem('authors'));
  const [genres, setGenres] = useState(sessionStorage.getItem('genres'));
  const [startMonth, setSM] = useState(sessionStorage.getItem('startMonth'));
  const [finishMonth, setFM] = useState(sessionStorage.getItem('finishMonth'));
  const [description, setDes] = useState(sessionStorage.getItem('description'));
  const [notes, setNotes] = useState(sessionStorage.getItem('notes'));

  function saveData() {
    sessionStorage.setItem('title',title);
    sessionStorage.setItem('genres',genres);
    sessionStorage.setItem('notes',notes);
    sessionStorage.setItem('startMonth',startMonth);
    sessionStorage.setItem('finishMonth',finishMonth);
  }

  function allDone() {
    fetch('/createnewbook', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        authors: authors,
        genres: genres.split('/'),
        startMonth: startMonth,
        finishMonth: finishMonth,
        description: description,
        notes: notes
      })
    }).then(response => response.json())
    .then(data => navigate(`/addtocollections/${data}`)); // object id of new book
  }

  return (
    <div className='page-content reviewnb-page'>
      <div><h2>Image:</h2></div>
      <div><h2>Title:</h2>{sessionStorage.getItem('title')}</div>
      <div><h2>Author(s):</h2>{sessionStorage.getItem('authors')}</div>
      <div><h2>Genre(s):</h2>{sessionStorage.getItem('genres')}</div>
      <div><h2>Started:</h2>{sessionStorage.getItem('startMonth')}</div>
      <div><h2>Finished:</h2>{sessionStorage.getItem('finishMonth')}</div>
      <div>
        <h2>Description:</h2>
        <textarea className='review-text' defaultValue={sessionStorage.getItem('description')}/>
      </div>
      <div>
        <h2>Notes:</h2>
        <textarea className='review-text' defaultValue={sessionStorage.getItem('notes')}/>
      </div>
      <button onClick={() => saveData()}>Save</button>
      <button onClick={() => navigate(-1)}>Return to Notes</button>
      <button onClick={() =>  allDone()}>DONE!</button>
    </div>
  )
}

export default ReviewNB