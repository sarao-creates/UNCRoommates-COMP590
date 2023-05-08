import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title';
import {TextField} from '@mui/material';
import { fontSize } from '@mui/system';
import { Link } from "react-router-dom";
import NavigationTabs from '../NavigationTabs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotLoggedIn from '../NotLoggedInPage/index.js';


function SettingsPage() {
    const [currentEmail, setCurrentEmail] = useState('')
    const [currentPhone, setCurrentPhone] = useState('')
    const [AccountStatus, setAccountStatus] = useState('')
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const flag = false;

    const [user, setUser] = useState({});

    const auth = getAuth();

    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                flag = true;
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                setUser(user)
                setCurrentEmail(docSnap.data()["email"])
                setCurrentPhone(docSnap.data()["phone"])

            } else {
                flag = false;
                console.log('user isnt signed in')
            }

            
        });
    }, []);

    const handleSaveChanges = () => {


        // updateEmail(auth.currentUser, newEmail).then(() => {
        //     // Email updated!
        //     // ...
        //   }).catch((error) => {
        //     // An error occurred
        //     // ...
        //   });
    }


    if (flag === true) {
    return (
        <div>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='full-screen'>
                <div className='originalsettings-container'>
                <Link to="/profile"><button class="settingsbutton settingsbutton-goBack">Back to Profile<br></br><span className='tinytext'>&#x28;Does <u><b>NOT</b></u> Save Changes!&#x29;</span></button></Link>
                        <div className='settingspage-header'>Settings</div>
                    <br></br>
                    <div className='settingsSaveChangessmaller-container' onClick={handleSaveChanges}>
                        <div className='settingsSaveChangesheaderpadding'>
                            <div className='originalsettingsSaveChanges-header'>
                            <span className='warning'>&#x26A0;</span> <b>Save Changes</b> <span className='warning'>&#x26A0;</span>
                            </div>
                        </div>
                        <div className='settingstextpadding'>
                        <div className='originalsettingstextinputheader'>To apply <b><u>ANY</u></b> changes you have made to your settings, please enter your current password below and click "Save Changes." This page should then reload and display your updated settings.</div>
                        <TextField
                            fullWidth
                            id="currentpassword"
                            label="Enter your current password"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                        <br></br>
                        <br></br>
                        <div className='settingsalignment-container'>
                            <Link to="/settings"><button class="settingsbutton settingsbutton-save"><span className='checkmark'><b>&#x2713; </b></span> Save Changes</button></Link>
                        </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='settingssmaller-container'>
                        <div className='settingsheaderpadding'>
                            <div className='originalsettings-header'>
                                Contact Info:
                            </div>
                        </div>
                        <div className='settingstextpadding'>
                        <div className='originalsettingstextinputheader'><b>Current Email:</b> {currentEmail}</div>
                        <TextField
                            fullWidth
                            id="email"
                            label="New email"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                    <div className='originalsettingstextinputheader'><b>Current Phone Number:</b> {currentPhone}</div>
                        <TextField
                            fullWidth
                            id="phone"
                            label="New phone number"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                    </div>
                    </div>
                <br></br>
                <br></br>
                <div className='settingssmaller-container'>
                    <div className='settingsheaderpadding'>
                        <div className='originalsettings-header'>
                            Password Settings:
                        </div>
                    </div>
                    <div className='settingstextpadding'>
                        <div className='originalsettingstextinputheader'><b>New Password:</b> </div>
                        <TextField
                            fullWidth
                            id="currentpassword"
                            label="Enter your current password"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            fullWidth
                            id="newpassword"
                            label="Enter new password"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                        </div>
                </div>
                <br></br>
                <div className='settingsalignment-container'>
                    <Link to='deactivationconfirm'><button class="settingsbutton settingsbutton-status">Deactivate Account</button></Link>
                </div>
                <br></br>
                </div> 
                <br></br>
            </div>
        </div>
    )
} else {
    return (<NotLoggedIn />)
}
}

export default SettingsPage
