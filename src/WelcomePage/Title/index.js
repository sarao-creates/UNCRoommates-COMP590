import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
function Title() {
  return (
    <div className = "Title">
      <div className='App-logo'>
        <img src={require('./images/logo.png')} alt="UNC logo of well." />
      </div>
      <h1 className='Text'>UNCRoommates</h1>
      <h2 className='Logout-text'>
        <br></br>
        <a href="/login"><Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b'}}variant='contained'size='medium'>Logout</Button></a>
        <h3 className='Settings-text'>
        <br></br>
        <a href="/settings"><Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b', marginTop: '10px'}}variant='contained'size='medium'>Settings</Button></a>
        </h3>
      </h2>
    </div>
  )
}

export default Title