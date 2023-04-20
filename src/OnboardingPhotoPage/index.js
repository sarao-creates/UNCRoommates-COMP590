import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title/index.js';
import {TextField} from '@mui/material';

function OnboardingPhotoPage() {
    const [file, setFile] = useState("");
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                ('#blah')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    return (
        <div>
            <Title></Title>
                <div className='full-screen'>
                    <div className='onboardingphoto-header'>Upload Optional Photo</div>
                    <div class="dashedline"></div>
                    <br></br>
                    <div className='onboardingphoto-container'>
                        <input type='file' onchange="readURL(this);" />
                        <img id="blah" src="http://placehold.it/180" alt="your image" />
                    <button class='button button-next'>Next</button>
                    </div>
                </div>
        </div>
    )
}

export default OnboardingPhotoPage