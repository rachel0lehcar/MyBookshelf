import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function MyBooks() {
  // const { collectionid } = useParams();
  // const [myBooks, setMyBooks] = new useState([]);
  

  /*useEffect(() => {
    //fetch('/getallbooks');
    fetch('/getallbooks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        collectionid: collectionid
      })
    }).then(response => response.json())
    .then(response => setMyBooks(response))
    .then(console.log(myBooks));

  },[])*/

  return (
    <div className='page-content'>
      {/* {myBooks.map((book) => {
        return(
          <h1>{book.title}</h1>
        )
     })} */}
    </div>
  )
}

export default MyBooks;