import React from 'react'
import './Title.css';
import logo from './logo.svg';
function Title() {
  return (
    <div className = "Title">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className='Text'>UNCRoommates</h1>
      <h2 className='Logout-text'> Logout</h2>
    </div>
  )
}

export default Title