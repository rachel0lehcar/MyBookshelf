import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function SingleBook() {
  const { bookid } = useParams();
  const [book, setBook] = useState({});

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
    .then(data => setBook(data));

  },[bookid]);

  return (
    <div className='page-content'>
      <h1>{book.title}</h1>
    </div>

  )
}

export default SingleBook;