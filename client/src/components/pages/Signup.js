import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    fetch('/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
    .then(res => {
      console.log(res);
      if(res === true) {
        navigate('/login');
      }
      else {
        console.log("There is already a user with that email.");
      }
    });

  }

  return (
    <div className="login-container">
      <article className="login-card">
        <h1 className="title">SIGN UP</h1>
        <form action="" className="login">
          <div className="element">
            <label htmlFor="">Email</label>
            <input onChange={e => setEmail(e.target.value)} className="uspass" type="text" />
          </div>
          <div className="element">
            <label htmlFor="">Password</label>
            <input onChange={e => setPassword(e.target.value)} type="text" className="uspass" />
          </div>
          <button onClick={register} className="login-submit">Submit</button>
        </form>

      </article>
    </div>
  )
}

export default Signup