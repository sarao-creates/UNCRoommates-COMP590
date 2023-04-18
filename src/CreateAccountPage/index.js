import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title';
import {TextField} from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase.js';
import { useHistory } from "react-router-dom";




function CreateAccountPage() {

    const history = useHistory();

    const [userInfo, setUserInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
    })

    const [pwd, setPWD] = useState('')

    const handlePWD = (event) => {
        setPWD(event.target.value)
    }

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, userInfo['email'], pwd).then((userCredential) => {
            console.log(userCredential.user)
            history.go('/survey');
            return db.collection('users').doc(userCredential.user.uid).set(userInfo);
        })
        .catch((error) => {
            console.log(error.code + " - " + error.message)
        })
    }

    const handleInfo = (prop) => (event) => {
        setUserInfo({...userInfo, [prop]: event.target.value});
    }

    return (
        <div>
            <Title></Title>
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
                        type="email"
                        size="small"
                        style = {{width: 340, paddingRight:78}}
                        onChange={handlePWD}
                    /><TextField
                        id="confirmpassword"
                        label="Re-enter password"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingBottom: 30}}
                        //onChange={}
                    />
                    <button onClick={handleSignup()} className="button button-create">Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountPage