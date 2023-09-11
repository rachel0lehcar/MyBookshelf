import './Navbar.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


function Navbar() {
  const location = useLocation();

  function handleLogout(event) {
    console.log('connect to backend');
    fetch('/logout'
    ).then(
      console.log('You are logged out')
    );
  }
  
  if((location.pathname === '/') || (location.pathname === '/signup')) //login signup
    return null;

  return (
    <>
      <div className="navbar">
        <Link className='home-button' to={'/home'}>MYBOOKSHELF</Link>

        <div className="nav-group">
          <Link className="nav-item" to={'/statistics'}>STATISTICS</Link>
          <Link className="nav-item" to={'/mybooks'}>MY BOOKS</Link>
          <Link className="nav-item" to={'/profile'}>PROFILE</Link>
          <Link className="nav-item" to={'/'} onClick={handleLogout}>LOGOUT</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;