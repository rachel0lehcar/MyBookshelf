import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page-content">
      <h1>Home</h1>
      <Link to={'/addbook'}>Add Book</Link>
    </div>
  )
}

export default Home