import React from 'react'
import './index.css';
import { Link } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {db} from '../../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';

function Title() {

  const auth = getAuth();
  const history = useHistory();

  const [user, setUser] = useState({})

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
        } else {
          console.log('not signed in')
        }
    });

}, []);

  const handleLogout = () => {

    signOut(auth).then(() => {
      console.log('Sign-out successful')
      history.push("/login")
    }).catch((error) => {
      console.log('Error signing out: ' + error)
    });
    
  }

  const handleSettings = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    const active = docSnap.data()["active"]

    if (active === true) {
      history.push('/settings')
    } else {
      history.push('/deactivatedsettings')
    }
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
        <button onClick={handleSettings} class="titlebuttonsettings">Settings</button>
        </div>
    </div>
  )
}

export default Title