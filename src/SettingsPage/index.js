import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title';
import {TextField} from '@mui/material';
import { fontSize } from '@mui/system';
import NavigationTabs from '../NavigationTabs';

// Code still needs to be created to allow user to type into the text boxes and press the save button
// and have it update their info in firebase, updating the info displayed on the page as well.
//
// New password and confirm password needs to match. And confirm password box should be greyed out if 
// there is nothing typed in the new password text box.
//
// WHY WONT SETTINGS PAGE HEADER CENTER?!!

function SettingsPage() {
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Password, setPassword] = useState('')
    const [AccountStatus, setAccountStatus] = useState('')

    useEffect(() => {

        const docLookup = async () => {
            const docRef = doc(db, "Users", "rkEcudx9k33I5nD8TC9a");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setEmail(docSnap.data()["Email"])
                setPhone(docSnap.data()["Phone Number"])
                setPassword(docSnap.data()["Password"])
                setAccountStatus(docSnap.data()["Account Status"])
              } else {
                setEmail("Error")
            }    
    
        }

        docLookup();

    }, []);

    return (
        <div>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='full-screen'>
                <div className='settings-container'>
                    <br></br>
                    <a href="/profile"><button class="button button-save">Save Changes</button></a>
                    <div className='page-header'>Settings</div>
                    <br></br>
                    <div className='smaller-container'>
                        <div className='headerpadding'>
                            <div className='settings-header'>
                                Contact Info:
                            </div>
                        </div>
                        <div className='textpadding'>
                        <div className='settingstextinputheader'><b>Current Email:</b> {Email}</div>
                        <TextField
                            fullWidth
                            id="email"
                            label="Edit email"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                    <div className='settingstextinputheader'><b>Current Phone Number:</b> {Phone}</div>
                        <TextField
                            fullWidth
                            id="phone"
                            label="Edit phone number"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                    </div>
                    </div>
                <br></br>
                <br></br>
                <div className='smaller-container'>
                    <div className='headerpadding'>
                        <div className='settings-header'>
                            Password Settings:
                        </div>
                    </div>
                    <div className='textpadding'>
                        <div className='settingstextinputheader'><b>Current Password:</b> {Password}</div>
                        <TextField
                            fullWidth
                            id="newpassword"
                            label="Edit password"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            fullWidth
                            id="confirmpassword"
                            label="Re-enter new password"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                        </div>
                </div>
                <br></br>
                <div className='alignment-container'>
                    <button class="button button-status">Deactivate Account</button>
                </div>    
                </div> 
            </div>
        </div>
    )
}

export default SettingsPage