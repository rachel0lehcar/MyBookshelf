import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function MyBooks() {
  const { collectionName } = useParams();
  const [myBooks, setMyBooks] = useState([]);
  

  useEffect(() => {
    //fetch('/getallbooks');
    fetch('/getallbooks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        collectionName: collectionName
      })
    }).then(response => response.json())
    .then(response => setMyBooks(response));
    //.then(console.log(myBooks));

  },[]);

  return (
    <div className='page-content'>
      <h1>{collectionName ? collectionName : "ALL BOOKS"}</h1>
      {myBooks.map((book) => {
        return(
          <Link to={`/singlebook/${book._id}`}><h3>{book.title}</h3></Link>
        )
     })}
    </div>
  )
}

export default MyBooks;