import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, updateDoc } from 'firebase/firestore';
import './index.css'
import { useState } from 'react';
import Title from '../WelcomePage/Title';
import {TextField} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";


function OnboardingBioPage() {

    const auth = getAuth();
    const user = auth.currentUser;

    const history = useHistory();

    const [bioInfo, setBioInfo] = useState({
        "count": 0,
        "value": "",
    });

    const validate = () => {
        console.log(bioInfo['count'])
        if (bioInfo["count"] >= 150 & bioInfo["count"] < 1500) {
            return true;
        }
        else {
            return false;
        }
      };

    const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
    });

    const handleBio = async () => {
        if (validate() === true) {
            console.log(user)
            await updateDoc(doc(db, "users", user.uid), {"bio":bioInfo["value"]})
            history.push('/survey');
        }
        else {
            setSnackbar({status: true, message: `Bio needs to be between 150 and 1500 characters.`});
        }
    }
    return (
        <div>
            <Title></Title>
                <div className='full-screen'>
                    <div className='onboardingbio-header'>Upload Bio</div>
                    <div class="dashedline"></div>
                    <br></br>
                    <div className='onboardingbio-container'>
                        <div className='onboardingbio-text'>Type a short bio of yourself here. You can include other information about yourself, such as hobbies, allergies, and lifestyle! <b>NOTE: You must enter at least 150 characters and no more than 1,500 characters.</b></div>
                        <TextField
                            fullWidth
                            multiline
                            id="bio"
                            label="Click to start typing..."
                            type="text"
                            rows={5}
                            className="full_height_Width"
                            onChange={(e) => setBioInfo({"count": e.target.value.length, "value":e.target.value})}
                        />
                        <p><b>Character Count: {bioInfo['count']}</b></p>
                        <button onClick={handleBio} class="button button-next" type="button" disabled={!validate()}>Next</button>
                    </div>
                    <Snackbar open={snackbar.status} autoHideDuration={7500} onClose={() => setSnackbar({status: false})}> 
                        <Alert severity='info'>{snackbar.message}</Alert>
                    </Snackbar>
                </div>
        </div>
    )
}

export default OnboardingBioPage