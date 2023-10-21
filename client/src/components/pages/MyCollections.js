import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function MyCollections() {

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    //console.log("here");
    fetch('/getcollections')
    .then(response => response.json())
    .then(data => setCollections(data));
    //.then(console.log(collections));
  },[]);

  return (
    <div className='page-content'>
      <Link to={'/mybooks'}>
        <h1>ALL BOOKS</h1>
      </Link>
     {collections.map((collection) => {
        return(
          <Link to={'/mybooks/'+ collection.name}>
            <h1>{collection.name}</h1>
          </Link>
        )
     })}
    
    </div>
  )
}

export default MyCollections;