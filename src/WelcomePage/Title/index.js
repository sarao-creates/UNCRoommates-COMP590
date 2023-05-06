import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Title() {
  return (
    <div className = "Title">
      <div className='App-logo'>
      <Link to="/welcome"><img src={require('./images/logo.png')} alt="UNC logo of well." /></Link>
      </div>
      <Link to="/welcome"><h1 className='Text'>UNCRoommates</h1></Link>
      <br></br>
      <div className='Logout-text'>
        <br></br>
        <Link to="/login"><button class="titlebuttonlogout">Logout</button></Link>
        </div>
        <div className='Settings-text'>
        <Link to="/settings"><button class="titlebuttonsettings">Settings</button></Link>
        </div>
    </div>
  )
}

export default Title