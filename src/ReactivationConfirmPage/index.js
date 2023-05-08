import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title/index.js';
import { Link } from "react-router-dom";
import NavigationTabs from '../NavigationTabs/index.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function ReactivationConfirmPage() {

    const auth = getAuth();

    const [user, setUser] = useState({})



    const handleReactivation = async () => {
        const docRef = doc(db, "users", user.uid);

        await updateDoc(docRef, {
            active: true,
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
                        <p><b>Are you sure you wish to reactivate your account?</b> You <b>will</b> be matched with other users while your account is active.
                        </p>
                        <br></br>
                    <div className='alignright'>
                    <Link to="/deactivatedsettings"><button class="button" type="button">&#x2716; Go Back</button></Link>
                    </div>
                    <div className='alignleft'>
                    <Link to="/settings"><button class="button" type="button" onClick={handleReactivation}>&#x2714; Yes, Reactivate Account</button></Link>
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

export default ReactivationConfirmPage