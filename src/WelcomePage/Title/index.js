import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
function Title() {
  return (
    <div className = "Title">
      <h1 className='Text'>UNCRoommates</h1>
      <h2 className='Logout-text'alignItems="stretch">
        <Button style={{backgroundColor:'#13294b'}}variant='contained'>Logout</Button>
        <Button style={{backgroundColor:'#13294b'}}variant='contained'>Settings</Button>
      </h2>
    </div>
  )
}

export default Title