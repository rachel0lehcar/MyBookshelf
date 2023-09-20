import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar'
import './pagestyles/Home.css'
import axios from 'axios'

function Home() {

  const [username, setUsername] = useState("");

  useEffect(() => {
    /*fetch('/user', { 
      method: 'GET',
      withCredentials: true, 
    }
    ).then(
      res => console.log(res)
    );*/

    axios({
      url: '/user',
      method: 'GET',
      withCredentials: true
    }).then(res => {
      console.log(res);
      setUsername(res.data.displayName);
    })
  },[]);

  return (
    <div className="page-content home-content">
      <section className="left">
        <ProgressBar />


        <div className="recents">

        </div>

      </section>
      <section className="right">
        <Link to="/profile"><img className="profile" src="" alt="Profile" /></Link>
        <h3>Hi {username}!</h3>
        <Link className="basic-button" to={'/addbook'}>ADD NEW BOOK</Link>
      </section>
    </div>
  )
}

export default Home