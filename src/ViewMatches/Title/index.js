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
        <Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b'}}variant='contained'size='medium'>Logout</Button>

        <br></br>
        <Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b', marginTop: '10px'}}variant='contained'size='medium'>Settings</Button>

      </h2>
    </div>
  )
}

export default Title