import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title/index.js';

function OnboardingPhotoPage() {
    const [file, setFile] = useState("");
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div>
            <Title></Title>
                <div className='full-screen'>
                    <div className='onboardingphoto-header'>Upload Optional Photo</div>
                    <div class="dashedline"></div>
                    <br></br>
                    <div className='onboardingphoto-container'>
                        <p className='largertext'>You can upload an <b>optional</b> photo of yourself here, which
                        will appear on your profile page for other users to see!</p>
                        <p>Try to use an image
                        that is clear and not one taken from too far away.
                        </p>
                        <div className='smallcontainer'>
                            <img src={file} class="img-border img-photo"/>
                            <br></br>
                            <input 
                            type="file" 
                            id="file"
                            accept="image/*"
                            onChange={handleChange}
                            />
                        </div>
                    <br></br>
                    <button class='button button-next'>Next</button>
                    </div>
                </div>
        </div>
    )
}

export default OnboardingPhotoPage