import React, { useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import "./pagestyles/AddBook.css"
//import axios from 'axios';

function AddBook() {
  const [book, setBook] = useState(useParams().booksearch);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    console.log('fetched');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function fetchBooks() {
    if(book !== undefined) {
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
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchBooks();
    navigate(`/addbook/${book}`);
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
          {result.map((book,index) => {
            const bookid = book.id;
            return(
              <Link to={`/googlebook/${bookid}`} key={index}>
                <img className="book" key={index} src={
                    book.volumeInfo.imageLinks === undefined
                    ? ""
                    : `${book.volumeInfo.imageLinks.thumbnail}`
                  }
                  alt={book.title}
                />
            </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default AddBook;