import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, updateDoc } from 'firebase/firestore';
import './index.css'
import { useState } from 'react';
import Title from '../WelcomePage/Title/index.js';
import { Link } from 'react-router-dom';
import {TextField} from '@mui/material';
import { getAuth } from "firebase/auth";


function OnboardingPhotoPage() {

    const [photoURL, setPhotoURL] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;

    const handleURL = (event) => {
        setPhotoURL(event.target.value)
    }

    const handleNext = async () => {
        await updateDoc(doc(db, "users", user.uid), {"photoURL":photoURL})

    }

    return (
        <div>
            <div className='full-screen'>
                <Title></Title>
                <div className='onboardingphoto-header'>Upload Optional Photo</div>
                <div class="dashedline"></div>
                <br></br>
                <div className='onboardingphoto-container'>
                    <p className='largertext'>You can enter an <b>optional</b> URL of a photo of yourself here, which
                    will appear on your profile page for other users to see! If you do not wish to include a photo,
                    leave the text box blank.</p>
                    <p>Try to use an image
                    that is clear and not one taken from too far away.
                    </p>
                    <TextField
                        id="url"
                        label="Enter the URL of Your Photo Here"
                        type="email"
                        size="small"
                        style = {{width: 340}}
                        onChange={handleURL}
                    />
                    <br></br>
                    <br></br>
                <Link to='/onboarding-bio'><button onClick={handleNext} class='button button-urlnext'>Next</button></Link>
                </div>
                <br></br>
                <br></br>
            </div>
        </div>
    )
}

export default OnboardingPhotoPage