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

function SettingsPage() {
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Password, setPassword] = useState('')
    const [AccountStatus, setAccountStatus] = useState('')

  /*   useEffect(() => {
    const history = useHistory();
    const [pwd, setPWD] = useState('');
    const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
    }); */
    
    /* const handlePWD = (event) => {
        setPWD(event.target.value);
    }

    const handlePasswordChange = () => {
        checkPassword(auth, pwd).then((userCredential) => {
            console.log('Original password check successful');
            history.push('/profile');
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            setSnackbar({status: true, message: `${errorCode} - ${errorMessage}`});

            console.log(`${errorCode} - ${errorMessage}`);
        })
    }
 */
    /* const docLookup = async () => {
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
    }, []); */

    return (
        <div>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='full-screen'>
                <div className='deactivatedsettings-container'>
                <Link to="/profile"><button class="deactivatedbutton deactivatedbutton-goBack">Back to Profile<br></br><span className='tinytext'>&#x28;Does <u><b>NOT</b></u> Save Changes!&#x29;</span></button></Link>
                        <div className='deactivatedpage-header'>Settings</div>
                    <br></br>
                    <div className='deactivatedSaveChangessmaller-container'>
                        <div className='deactivatedSaveChangesheaderpadding'>
                            <div className='deactivatedsettingsSaveChanges-header'>
                            <span className='warning'>&#x26A0;</span> <b>Save Changes</b> <span className='warning'>&#x26A0;</span>
                            </div>
                        </div>
                        <div className='deactivatedtextpadding'>
                        <div className='deactivatedsettingstextinputheader'>To apply <b><u>ANY</u></b> changes you have made to your settings, please enter your current password below and click "Save Changes." This page should then reload and display your updated settings.</div>
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
                        <div className='deactivatedalignment-container'>
                            <Link to="/settings"><button class="deactivatedbutton deactivatedbutton-save"><span className='checkmark'><b>&#x2713; </b></span> Save Changes</button></Link>
                        </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='deactivatedsmaller-container'>
                        <div className='deactivatedheaderpadding'>
                            <div className='deactivatedsettings-header'>
                                Contact Info:
                            </div>
                        </div>
                        <div className='deactivatedtextpadding'>
                        <div className='deactivatedsettingstextinputheader'><b>Current Email:</b> {Email}</div>
                        <TextField
                            fullWidth
                            id="email"
                            label="New email"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                    <div className='deactivatedsettingstextinputheader'><b>Current Phone Number:</b> {Phone}</div>
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
                <div className='deactivatedsmaller-container'>
                    <div className='deactivatedheaderpadding'>
                        <div className='deactivatedsettings-header'>
                            Password Settings:
                        </div>
                    </div>
                    <div className='deactivatedtextpadding'>
                        <div className='deactivatedsettingstextinputheader'><b>New Password:</b> {Password}</div>
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
                <div className='deactivatedalignment-container'>
                    <Link to='deactivationconfirm'><button class="deactivatedbutton deactivatedbutton-status">Reactivate Account</button></Link>
                </div>
                <br></br>
                </div> 
                <br></br>
            </div>
        </div>
    )
}

export default SettingsPage