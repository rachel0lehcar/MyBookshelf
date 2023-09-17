import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./pagestyles/GoogleBook.css";

function GoogleBook() {
  const { bookid } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState({title: null, authors: null, genres: null, description: null});
  const titleRef = useRef();
  const authorsRef = useRef();
  const genresRef = useRef();
  const desRef = useRef();

  console.log("TITLE " + titleRef);

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
  },[bookid]);
  
  function addTitle() {
    setNewBook(prevState => {
      console.log(newBook);
      return {...prevState, title: titleRef.current.innerText}
    });
  } 
  function addAuthors() {
    setNewBook(prevState => {
      console.log(newBook);
      return {...prevState, authors: authorsRef.current.innerText}
    });
  }
  function addDes() {
    setNewBook(prevState => {
      console.log(newBook);
      return {...prevState, description: desRef.current.innerText}
    });
  }
  function addGenres() {
    setNewBook(prevState => {
      console.log(newBook);
      return {...prevState, genres: genresRef.current.innerText}
    });
  }

  /*function saveToDB() {
    console.log('save to db');
  }*/

  return (
    <div className='page-content'>
      {book.volumeInfo ?
        <>
          <Link 
            to={book.volumeInfo.previewLink} 
            target="__blank"
            className='google-book-link'
          >
            {/*<p className='img-text'>Google Books<br/>Preview</p>*/}
            <img className="book" src={
              book.volumeInfo.imageLinks === undefined
                ? ""
                : `${book.volumeInfo.imageLinks.thumbnail}`
              }
              alt={book.volumeInfo.title}
            />
          </Link>
          <button onClick={addTitle}>+</button><h1>Title: <span ref={titleRef}>{book.volumeInfo.title}</span></h1>
          <button onClick={addAuthors}>+</button><h3>Author(s): <span ref={authorsRef}>{book.volumeInfo.authors}</span></h3>
          <br></br>
          <button onClick={addDes}>+</button><p>Description: <span ref={desRef} dangerouslySetInnerHTML={{__html:book.volumeInfo.description}}/></p>
          {/*<p><button ref={} onClick={}>+</button>Main Categories: {book.volumeInfo.mainCategory}</p>*/}
          <button onClick={addGenres}>+</button><p>All Categories: <span ref={genresRef}>{book.volumeInfo.categories}</span></p>
        </>
        : null 
      }
      <button onClick={() => navigate(-1)}>Return to Search Results</button>
      <button onClick={() => navigate('/notesrating')}>Continue to Notes and Rating</button>
    </div>
  );
}

export default GoogleBook;