import './Navbar.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


function Navbar() {
  const location = useLocation();
  
  if(location.pathname === '/') //login
    return null;

  return (
    <>
      <div className="navbar">
        <Link className='home-button' to={'/home'}>MYBOOKSHELF</Link>

        <div className="nav-group">
          <Link className="nav-item" to={'/statistics'}>STATISTICS</Link>
          <Link className="nav-item" to={'/mybooks'}>MY BOOKS</Link>
          <Link className="nav-item" to={'/profile'}>PROFILE</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;