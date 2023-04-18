import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title';
import {TextField} from '@mui/material';

function OnboardingBioPage() {
    const [count, setCount] = React.useState(0);
    const validate = () => {
        return count >= 150 & count < 1500;
      };
    return (
        <div>
            <Title></Title>
                <div className='full-screen'>
                    <div className='onboardingbio-header'>Upload Bio</div>
                    <div class="dashedline"></div>
                    <br></br>
                    <div className='onboardingbio-container'>
                        <p>Type a short bio of yourself here. You can include other information about yourself, such as hobbies, allergies, and lifestyle!</p>
                        <TextField
                            fullWidth
                            multiline
                            id="bio"
                            label="Click to start typing..."
                            type="text"
                            rows={5}
                            className="full_height_Width"
                            onChange={e => setCount(e.target.value.length)}
                        />
                        <p>{count}</p>
                        <button class="button" type="button" disabled={!validate()}>Next</button>
                    </div>
                </div>
        </div>
    )
}

export default OnboardingBioPage