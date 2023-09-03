import React from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar'
import './Home.css'

function Home() {
  return (
    <div className="page-content">
      <section className="left">
        <ProgressBar />


        <div className="recents">

        </div>

      </section>
      <section className="right">
        <img className="profile" src="" alt="Profile" />
        <h3>USERNAME</h3>
        <Link className="basic-button" to={'/addbook'}>ADD NEW BOOK</Link>
      </section>
    </div>
  )
}

export default Home