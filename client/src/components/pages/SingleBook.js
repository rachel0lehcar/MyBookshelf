import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './pagestyles/SingleBook.css'

function SingleBook() {
  const { bookid } = useParams();
  const [book, setBook] = useState({});
  const [textDisplay, setTextDisplay] = useState("");

  useEffect(() => {
    fetch('/getbook', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookid: bookid
      })
    }).then(response => response.json())
    .then(data => setBook(data))
    .then(setTextDisplay(book.summary));

  },[bookid]);

  function summaryClick(event) {
    event.preventDefault();
    setTextDisplay(book.summary);
  }

  function notesClick(event) {
    event.preventDefault();
    setTextDisplay(book.notes);
  }

  return (
    <div className='page-content left-right'> 
    {book ? 
      <>
        <div className="book-left">
          <h1>{book.title}</h1>
          <p>Author: {book.authors}</p>
          <p>Genres: {book.genres}</p>
          <h2>Included in...</h2>
          {book.collections?.map(col => {
            return( <p>{col.name}</p> )
          })}
        </div>
        <div className="book-right">
          <div className="switch">
            <button className="switch-btn"onClick={summaryClick}>SUMMARY</button>
            <button className="switch-btn"onClick={notesClick}>NOTES</button>
          </div>
          <p className="summary-notes">{textDisplay}</p>
        </div>
      </>
    : null}
    </div>

  )
}

export default SingleBook;