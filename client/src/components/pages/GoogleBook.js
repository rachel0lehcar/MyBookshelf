import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function GoogleBook() {
  const { bookid } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() =>{
    fetch('/gbvolume/' + bookid,{ method: 'GET' }
    ).then(
      response => response.json()
    ).then(
      data => {
        setBook(data)
        console.log('book info fetched');
        console.log(data);
        //console.log(book.volumeInfo);
      }
    );
  },[bookid]) 

  return (
    <div className='page-content'>
      {book.volumeInfo ?
        <>
          <img className="book" src={
            book.volumeInfo.imageLinks === undefined
              ? ""
              : `${book.volumeInfo.imageLinks.thumbnail}`
            }
            alt={book.volumeInfo.title}
          />
          <h1>{book.volumeInfo.title}</h1>
          <p>{book.volumeInfo.description}</p>
          <h1>{book.volumeInfo.mainCategory}</h1>
          <p>{book.volumeInfo.categories}</p>
        </>
        : null 
      }
      <button onClick={() => navigate(-1)}>Return to Search Results</button>
    </div>
  );
}

export default GoogleBook;