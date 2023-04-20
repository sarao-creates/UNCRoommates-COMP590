import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title';
import {TextField} from '@mui/material';

function CreateAccountPage() {

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
                        //onChange={}
                    /><TextField
                        id="phone"
                        label="Phone number (Optional)"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingBottom: 30}}
                        //onChange={}
                    /><TextField
                        id="firstname"
                        label="First name"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingRight:78}}
                        //onChange={}
                    /><TextField
                        id="lastname"
                        label="Last name"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingBottom: 30}}
                        //onChange={}
                    /><TextField
                        id="password"
                        label="Password"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingRight:78}}
                        //onChange={}
                    /><TextField
                        id="confirmpassword"
                        label="Re-enter password"
                        type="email"
                        size="small"
                        style = {{width: 340, paddingBottom: 30}}
                        //onChange={}
                    />
                    <button class="button button-create" type="button">Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountPage
