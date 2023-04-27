import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import './index.css'
import { useState, useEffect } from 'react';
import LoginTitle from '../WelcomePage/LoginTitle';
import {TextField} from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase.js';
import { useHistory } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';





function CreateAccountPage() {

    const history = useHistory();

    const [userInfo, setUserInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
    })

     const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
    });


    const [pwd, setPWD] = useState('')

    const handlePWD = (event) => {
        setPWD(event.target.value)
    }

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, userInfo['email'], pwd).then(async (userCredential) => {
            console.log(userCredential.user)
            history.push('/onboarding-photo');
            // return db.collection('users').doc(userCredential.user.uid).set(userInfo);
            await setDoc(doc(db, "users", userCredential.user.uid), userInfo);
        })
        .catch((error) => {
            console.log(error.code + " - " + error.message);
            setSnackbar({status: true, message: `${error.code} - ${error.message}`});
        })
    }

    const handleInfo = (prop) => (event) => {
        setUserInfo({...userInfo, [prop]: event.target.value});
    }

    return (
        <div>
            <LoginTitle></LoginTitle>
                <div className='full-screen'>
                    <div className='createaccount-header'>Create an Account</div>
                    <div class="dashedline"></div>
                    <br></br>
                    <div className='createaccount-container'>
                    <TextField
                        id="email"
                        label="UNC email"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingRight: 78}}
                        onChange={handleInfo('email')}
                    /><TextField
                        id="phone"
                        label="Phone number (Optional)"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingBottom: 30}}
                        onChange={handleInfo('phone')}
                    /><TextField
                        id="firstname"
                        label="First name"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingRight:78}}
                        onChange={handleInfo('firstName')}
                    /><TextField
                        id="lastname"
                        label="Last name"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingBottom: 30}}
                        onChange={handleInfo('lastName')}
                    /><TextField
                        id="password"
                        label="Password"
                        type="password"
                        size="small"
                        style = {{width: 340, paddingRight:78}}
                        onChange={handlePWD}
                    /><TextField
                        id="confirmpassword"
                        label="Re-enter password"
                        type="password"
                        size="small"
                        style = {{width: 340, paddingBottom: 30}}
                        //onChange={}
                    />
                    <button onClick={handleSignup} class="button button-create" type="button">Create Account</button>

                    {/* <button onClick={handleSignup} className="button button-create">Create Account</button> */}
                    <Snackbar open={snackbar.status} autoHideDuration={7500} onClose={() => setSnackbar({status: false})}> 
                        <Alert severity='info'>{snackbar.message}</Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountPage