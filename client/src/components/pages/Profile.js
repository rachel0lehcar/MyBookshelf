import React from 'react'
import './Profile.css'

function Profile() {
  return (
    <div className="page-content profile-container">
      <img className="profile" src="" alt="Profile" />
      <h3 className='profile-element'>Username: ______</h3>
      <h3 className='profile-element'>Goal for the Year: ______</h3>
      <div className="profile-element themes">
        <h3 className='theme-header'>Theme</h3>
        <span className="theme-color" id="cobalt"style={ {backgroundColor: '#5B76FF'}}></span>
        <span className="theme-color" id="pink"  style={ {backgroundColor: '#FFAAD4'}}></span>
        <span className="theme-color" id="white" style={ {backgroundColor: 'white'}}></span>
        <span className="theme-color" id="navy"  style={ {backgroundColor: '#475B8D'}}></span>
      </div>
    </div>
  )
}

export default Profile