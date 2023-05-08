import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';

function Title() {

  const auth = getAuth();
  const history = useHistory();

  const handleLogout = () => {

    signOut(auth).then(() => {
      console.log('Sign-out successful')
      history.push("/login")
    }).catch((error) => {
      console.log('Error signing out: ' + error)
    });
    
  }

  return (
    <div className = "Title">
      <div className='App-logo'>
      <Link to="/welcome"><img src={require('./images/logo.png')} alt="UNC logo of well." /></Link>
      </div>
      <Link to="/welcome"><h1 className='Text'>UNCRoommates</h1></Link>
      <br></br>
      <div className='Logout-text'>
        <br></br>
        <button onClick={handleLogout} class="titlebuttonlogout">Logout</button>
        </div>
        <div className='Settings-text'>
        <Link to="/settings"><button class="titlebuttonsettings">Settings</button></Link>
        </div>
    </div>
  )
}

export default Title