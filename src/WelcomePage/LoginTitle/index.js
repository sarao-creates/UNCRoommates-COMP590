import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function LoginTitle() {
  return (
    <div className = "Title">
      <div className='App-logo'>
      <Link to="/welcome"><img src={require('./images/logo.png')} alt="UNC logo of well." /></Link>
      </div>
      <Link to="/welcome"><h1 className='Text'>UNCRoommates</h1></Link>
      <div className='Login-text'>
        <br></br>
        <Link to="/login"><button class="logintitlebutton">Login</button></Link>
      </div>
    </div>
  )
}

export default LoginTitle