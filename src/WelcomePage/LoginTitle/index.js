import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
function LoginTitle() {
  return (
    <div className = "Title">
      <div className='App-logo'>
      <a href="/welcome"><img src={require('./images/logo.png')} alt="UNC logo of well." /></a>
      </div>
      <a href="/welcome"><h1 className='Text'>UNCRoommates</h1></a>
      <h2 className='Login-text'>
        <br></br>
        <a href="/login"><Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b'}}variant='contained'size='medium'>Login</Button></a>
      </h2>
    </div>
  )
}

export default LoginTitle