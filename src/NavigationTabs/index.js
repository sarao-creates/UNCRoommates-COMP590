import React from 'react'
import { NavLink } from "react-router-dom";
import './index.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'

function NavigationTabs() {

    const auth = getAuth();
    const [active, setActive] = useState(false)

    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setActive(docSnap.data()['active'])
            } else {
              console.log('document does not exist')
            }    

        } else {
          console.log('not signed in')
        }

        
    });
      
      

  }, []);

  if (active) {
    return (
      <div>
        <ul className="nav"> 
          <li>
            <NavLink activeStyle={{ background:'white', color: '#13294B' }} to="/profile">Account and Bio</NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ background:'white', color: '#13294B' }} to="/viewmatches">View Potential Matches</NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ background:'white', color: '#13294B' }} to="/survey">Edit Survey</NavLink>
          </li>
        </ul>
      </div>
    );
  } else {
  return (
    <div>
        <ul className="nav"> 
          <li>
            <NavLink activeStyle={{ background:'white', color: '#13294B' }} to="/profile">Account and Bio</NavLink>
          </li>
        </ul>
      </div>
  )
}
}
  export default NavigationTabs;