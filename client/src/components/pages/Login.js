import React from 'react';
import { Link } from 'react-router-dom';
import './pagestyles/Login.css'

function Login() {

  const googleAuth = ()=> {
    window.open(process.env.REACT_APP_GOOGLE_LOGIN,'_self');
  }

  return (
    <div className="login-container">
      <div className='text'>
        Log Your Reading <br /><br />
        View your Progress <br /><br />
        List your Favorites <br /><br />
        Keep Track of your Thoughts <br />
      </div>
      <article className="login-card">
        <h1 className="title">MOREREADS</h1>
        <form action="" className="login">
          <div className="element">
            <label htmlFor="">Username</label>
            <input className="uspass" type="text" />
          </div>
          <div className="element">
            <label htmlFor="">Password</label>
            <input type="text" className="uspass" />
          </div>
          <button className="login-submit">Submit</button>
        </form>
        <div className="option"><span>OR</span></div>
        <button className="google-login" onClick={googleAuth}>Continue with Google</button>
        <p className='signup-link'>Need an account? <Link className="signup" to={'/signup'}>SIGN UP</Link></p>
      </article>
    </div>
  )
}

export default Login;