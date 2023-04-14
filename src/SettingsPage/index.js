import React from 'react'
import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import './index.css'
import { useState, useEffect } from 'react';
import Title from '../WelcomePage/Title';

// Code still needs to be created to allow user to type into the text boxes and press the save button
// and have it update their info in firebase, updating the info displayed on the page as well.
//
// I changed the deactive/reactivate button design because just having one button's text change 
// depending on whether the account is currently active would be easier than having two buttons with
// one greyed-out and the other clickable like in the prototype. I could be wrong though, maybe the 
// prototype way would easier to code.

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
            <div className='full-screen'>
                <div className='settings-container'>
                    <br></br>
                    <button class="button button-save">Save Changes</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='smaller-container'>
                        <div className='settings-header'>
                            Contact Info:
                        </div>
                        <div className='settings-header-description'>
                        &#x28;click text box and type&#x29;
                        </div>
                    <form>
                        <div className="form-text">Email: {Email}</div>
                            <input type="text" placeholder="Edit Email...">
                            </input>
                    </form>
                    <br></br>
                    <form>
                        <div className="form-text">Phone: {Phone}</div>
                            <input type="text" placeholder="Edit Phone Number...">
                            </input>
                    </form>
                    </div>
                <br></br>
                <br></br>
                <div className='smaller-container'>
                        <div className='settings-header'>
                            Password Settings:
                        </div>
                    <form>
                        <div className="form-text">Current Password: {Password}</div>
                            <input type="text" placeholder="Enter New Password...">
                            </input>
                    </form>
                    <br></br>
                    <form>
                        <div className="form-text">Confirm New Password:</div>
                            <input type="text" placeholder="Re-enter New Password...">
                            </input>
                    </form>
                </div>
                <br></br>
                    <button class="button button-status">Deactivate Account</button>
                </div>
                
            </div>
        </div>
    )
}

export default SettingsPage