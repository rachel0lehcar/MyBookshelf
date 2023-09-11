import React from 'react'

function Signup() {
  return (
    <div className="login-container">
      <article className="login-card">
        <h1 className="title">SIGN UP</h1>
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

      </article>
    </div>
  )
}

export default Signup