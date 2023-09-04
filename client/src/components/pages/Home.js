import React from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar'
import './pagestyles/Home.css'

function Home() {
  return (
    <div className="page-content home-content">
      <section className="left">
        <ProgressBar />


        <div className="recents">

        </div>

      </section>
      <section className="right">
        <Link to="/profile"><img className="profile" src="" alt="Profile" /></Link>
        <h3>USERNAME</h3>
        <Link className="basic-button" to={'/addbook'}>ADD NEW BOOK</Link>
      </section>
    </div>
  )
}

export default Home