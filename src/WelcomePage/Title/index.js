import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
function Title() {
  return (
    <div className = "Title">
      <div className='App-logo'>
      <a href="/welcome"><img src={require('./images/logo.png')} alt="UNC logo of well." /></a>
      </div>
      <a href="/welcome"><h1 className='Text'>UNCRoommates</h1></a>
      <h2 className='Logout-text'>
      <br></br>
        <a href="/login"><Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b'}}variant='contained'size='medium'>Logout</Button></a>
        <div className='Settings-text'>
        <br></br>
        <br></br>
        <a href="/settings"><Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b', marginTop: '10px'}}variant='contained'size='medium'>Settings</Button></a>
        </div>
      </h2>
    </div>
  )
}

export default Title