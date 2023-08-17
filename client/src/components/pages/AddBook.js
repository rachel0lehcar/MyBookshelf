import React, { useState} from 'react'
//import axios from 'axios';

function AddBook() {

  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);


  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log('connect to backend');
    fetch('/googlebooks/' + book,{ method: 'GET' }
    ).then(
      response => response.json()
    ).then(
      data => {
        setResult(data)
        console.log('set data')
        console.log(data)
      }
    );
  }

  return (
    <>
      <h1>Find Your Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            onChange={handleChange}
            placeholder='Search for Books' 
            autoComplete='off'/>
        </div>
        <button type="submit">Search</button>
      </form>
      {result.map((book,index) => (
        <img key={index} src={
            book.volumeInfo.imageLinks === undefined
            ? ""
            : `${book.volumeInfo.imageLinks.thumbnail}`
          }
          alt={book.title}
        />
      ))}
    </>
  );
}

export default AddBook;