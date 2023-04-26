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
      <h2 className='Login-text'>
        <br></br>
        <Link to="/login"><Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b'}}variant='contained'size='medium'>Login</Button></Link>
      </h2>
    </div>
  )
}

export default LoginTitle