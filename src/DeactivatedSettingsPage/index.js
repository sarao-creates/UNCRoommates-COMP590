import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title';
import {TextField} from '@mui/material';
import { Link } from "react-router-dom";
import NavigationTabs from '../NavigationTabs';
import { getAuth, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function DeactivatedSettingsPage() {
    const [currentEmail, setCurrentEmail] = useState('')
    const [currentPhone, setCurrentPhone] = useState('')
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [currentEnteredPassword, setCurrentEnteredPassword] = useState('')
    const [newEnteredPassword, setNewEnteredPassword] = useState('')
    const [newPasswordConf, setNewPasswordConf] = useState('')

    const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
    });



    const [user, setUser] = useState({});

    const auth = getAuth();

    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                setUser(user)
                setCurrentEmail(docSnap.data()["email"])
                setCurrentPhone(docSnap.data()["phone"])

            } else {
                console.log('user isnt signed in')
            }

            
        });
    }, []);

    const handleSaveChanges = () => {

        if ((newEmail === '') && (newPhone === '') && (newEnteredPassword === '')) {
            setSnackbar({status: true, message: 'No entry for new email, phone, or password has been made. Please try again.'})
        }

        // const credential = promptForCredentials();
        reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(auth.currentUser.email, currentEnteredPassword)).then(async () => {
            console.log('it worked')
            console.log(currentEmail)
            console.log(newEmail);
            if ((currentEmail !== newEmail) && (newEmail !== '')) {
                console.log(' are we getting here');
                updateEmail(auth.currentUser, newEmail).then(async () => {
                    await updateDoc(doc(db, "users", user.uid), {"email":newEmail})
                    setSnackbar({status: true, message: 'Your email has been updated!'})
                }).catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    setSnackbar({status: true, message: `${errorCode} - ${errorMessage}`});
                });
            }

            if ((currentPhone !== newPhone) && (newPhone !== '')) {
                await updateDoc(doc(db, "users", user.uid), {"phone":newPhone})
                setSnackbar({status: true, message: 'Your phone has been updated!'})
            }

            if ((currentEnteredPassword !== newEnteredPassword) && (newEnteredPassword !== '')) {
                if (newEnteredPassword === newPasswordConf) {
                    updatePassword(auth.currentUser, newEnteredPassword).then(() => {
                        setSnackbar({status: true, message: 'Your password has been updated!'})
                    }).catch((error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        setSnackbar({status: true, message: `${errorCode} - ${errorMessage}`});
                    });
                } else {
                    setSnackbar({status: true, message: 'New password and confirmation do not match! Please try again.'})
                }
                  
            }
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            setSnackbar({status: true, message: `${errorCode} - ${errorMessage}`});
        });


        
    }

    const handleCurrentPWDEntry = (event) => {
        setCurrentEnteredPassword(event.target.value);
    }

    const handleNewPWDEntry = (event) => {
        setNewEnteredPassword(event.target.value);
    }

    const handleNewPhone = (event) => {
        setNewPhone(event.target.value)
    }

    const handleNewEmail = (event) => {
        setNewEmail(event.target.value);
    }

    const handleNewPWDConfirmation = (event) => {
        setNewPasswordConf(event.target.value);
    }


  

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
                            onChange={handleCurrentPWDEntry}
                        />
                        <br></br>
                        <br></br>
                        <div className='deactivatedalignment-container'>
                            <Link to="/settings"><button onClick={handleSaveChanges} class="deactivatedbutton deactivatedbutton-save"><span className='checkmark'><b>&#x2713; </b></span> Save Changes</button></Link>
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
                        <div className='deactivatedsettingstextinputheader'><b>Current Email:</b> {currentEmail}</div>
                        <TextField
                            fullWidth
                            id="email"
                            label="New email"
                            type="email"
                            size="small"
                            onChange={handleNewEmail}
                        />
                    <div className='deactivatedsettingstextinputheader'><b>Current Phone Number:</b> {currentPhone}</div>
                        <TextField
                            fullWidth
                            id="phone"
                            label="New phone number"
                            type="email"
                            size="small"
                            onChange={handleNewPhone}
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
                        <div className='deactivatedsettingstextinputheader'><b>New Password:</b></div>
                        <TextField
                            fullWidth
                            id="currentpassword"
                            label="Enter your new password"
                            type="email"
                            size="small"
                            onChange={handleNewPWDEntry}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            fullWidth
                            id="newpassword"
                            label="Re-enter new password"
                            type="email"
                            size="small"
                            onChange={handleNewPWDConfirmation}
                        />
                        </div>
                </div>
                <br></br>
                <div className='deactivatedalignment-container'>
                    <Link to='reactivationconfirm'><button class="deactivatedbutton deactivatedbutton-status">Reactivate Account</button></Link>
                </div>
                <br></br>
                </div> 
                <br></br>
            </div>
            <Snackbar open={snackbar.status} autoHideDuration={7500} onClose={() => setSnackbar({status: false})}> 
                    <Alert severity='info'>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    )
}

export default DeactivatedSettingsPage
