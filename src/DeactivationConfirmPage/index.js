import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, updateDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title';
import { Link } from "react-router-dom";
import NavigationTabs from '../NavigationTabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function DeactivationConfirmPage() {

    const auth = getAuth();

    const [user, setUser] = useState({})



    const handleDeactivation = async () => {
        const docRef = doc(db, "users", user.uid);

        await updateDoc(docRef, {
            active: false,
        });
    }

    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

            } else {
                console.log('not signed in')
            }

        
        });

    }, []);


    return (
        <div>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='full-screen'>
                <div  className='alignment-container'>
                <div className='settings-container'>
                    <br></br>
                    <div className='smaller-container'>
                        <p><b>Are you sure you wish to deactivate your account?</b> You will <b>not</b> be matched with other users while your account is inactive.
                        </p>
                        <br></br>
                    <div className='alignright'>
                    <Link to="/settings"><button class="button" type="button">&#x2716; Go Back</button></Link>
                    </div>
                    <div className='alignleft'>
                    <Link to="/settings"><button class="button" type="button" onClick={handleDeactivation}>&#x2714; Yes, Deactivate Account</button></Link>
                    </div>
                    </div>
                <br></br>
                </div> 
                <br></br>
                </div> 
            </div>
        </div>
    )
}

export default DeactivationConfirmPage