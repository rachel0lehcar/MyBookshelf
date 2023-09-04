import React, { useState} from 'react'
import "./pagestyles/AddBook.css"
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
    <div className="page-content">
      <h1>Find Book</h1>
      <form className="search-form"onSubmit={handleSubmit}>
        <div>
          <input 
            className='search-bar'
            type="text" 
            onChange={handleChange}
            /*placeholder='Search for Books'*/
            autoComplete='off'/>
        </div>
        <button className="basic-button" type="submit">SEARCH</button>
      </form>
      <div className='center'>
        <div className="search-results">
          {result.map((book,index) => (
            <img className="book" key={index} src={
                book.volumeInfo.imageLinks === undefined
                ? ""
                : `${book.volumeInfo.imageLinks.thumbnail}`
              }
              alt={book.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddBook;