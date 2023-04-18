import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
function Title() {
  return (
    <div className = "Title">
      <h1 className='Text'>UNCRoommates</h1>
      <h2 className='Logout-text'>
        <Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b'}}variant='contained'size='medium'>Logout</Button>
        <h3 className='Settings-text'>
        <Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b'}}variant='contained'size='medium'>Settings</Button>
        </h3>
      </h2>
    </div>
  )
}

export default Title