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

function DeactivatedSettingsPage() {
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
    }, []);

    return (
        <div>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='full-screen'>
                <div className='settings-container'>
                    <br></br>
                    <Link to="/profile"><button class="button button-save">Save Changes</button></Link>
                        <div className='page-header'>Settings</div>
                    <br></br>
                    <div className='smaller-container'>
                        <div className='headerpadding'>
                            <div className='alignment-container'>
                                <div className='settings-header'>
                                    &#x26A0; Account Currently Inactive &#x26A0;
                                </div>
                            </div>
                         </div>
                         <div className='text'><b>NOTE: Your account is currently deactivated.</b> Other users will be 
                                unable to view your profile and be matched with you, and you will not 
                                be matched with others. To reactivate your account, please visit the 
                                settings page.</div>
                    </div>
                    <br></br>
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
                            label="New email"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                    <div className='settingstextinputheader'><b>Current Phone Number:</b> {Phone}</div>
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
                <div className='smaller-container'>
                    <div className='headerpadding'>
                        <div className='settings-header'>
                            Password Settings:
                        </div>
                    </div>
                    <div className='textpadding'>
                        <div className='settingstextinputheader'><b>New Password:</b> {Password}</div>
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
                <div className='alignment-container'><button class="button button-status">Reactivate Account</button>
                </div>
                <br></br>
                </div> 
            </div>
        </div>
    )
}

export default DeactivatedSettingsPage