import React from 'react'
import './pagestyles/Profile.css'

function Profile() {

  function changeColor(element) {
    const id = element.currentTarget.id;
    let color;
    
    if(id === 'cobalt')
      color = '#5B76FF';
    else if(id === 'pink')
      color = '#FFAAD4';
    else if(id === 'white')
      color = 'white';
    else if(id === 'navy')
      color = '#475B8D';

    localStorage.setItem('background-color', color);
    document.documentElement.style.setProperty('--base1',color);
    // console.log('color change ' + localStorage.getItem('background-color'));
  }

  return (
    <div className="page-content profile-container">
      <img className="profile" src="" alt="Profile" />
      <h3 className='profile-element'>Username: ______</h3>
      <h3 className='profile-element'>Goal for the Year: ______</h3>
      <div className="profile-element themes">
        <h3 className='theme-header'>Theme</h3>
        <button onClick={changeColor} className="theme-color" id="cobalt"style={ {backgroundColor: '#5B76FF'}}></button>
        <button onClick={changeColor} className="theme-color" id="pink"  style={ {backgroundColor: '#FFAAD4'}}></button>
        <button onClick={changeColor} className="theme-color" id="white" style={ {backgroundColor: 'white'}}></button>
        <button onClick={changeColor} className="theme-color" id="navy"  style={ {backgroundColor: '#475B8D'}}></button>
      </div>
    </div>
  )
}

export default Profile