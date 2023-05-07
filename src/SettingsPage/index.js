import './index.css'
import Title from '../WelcomePage/Title'
import NavigationTabs from '../NavigationTabs';
import React, { useState , useEffect } from 'react';
import {
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  MenuItem,
  InputLabel,
  Select,
  Snackbar,
  Alert
} from '@mui/material';

import db from '../Firebase/firebase.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';



//import {Redirect} from 'react-router-dom';
//import { createTheme, ThemeProvider } from '@mui/material/styles';

function Survey() {
  const auth = getAuth();
  const history = useHistory();
  // const user = auth.currentUser;
  
  //const [name, setName] = useState('');

  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const [classYear, setClassYear] = useState('');
  const [major, setMajor] = useState('');
  const [location, setLocation] = useState('');
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [noiseLevel, setNoiseLevel] = useState('');
  const [guestLevel, setGuestLevel] = useState('');
  const [tidiness, setTidiness] = useState('');
  const [allergies, setAllergies] = useState('');
  const [accomodations, setAccomodations] = useState('');
  const [window, setWindow] = useState('');
  const [animal, setAnimal] = useState('');
  const [party, setParty] = useState('');
  // const [setError] = useState('');
  const [user, setUser] = useState({});
  const [snackbar, setSnackbar] = useState({
    status: false,
    message: '',
  })

  useEffect(() => {
    // const surveyData = JSON.parse(localStorage.getItem("surveyData"));
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const surveyData = (await getDoc(doc(db, "users", user.uid))).data().responses;
        console.log(user.uid)
        console.log(surveyData)
        if (surveyData) {
          // setName(surveyData.name);
          setBirthYear(surveyData.birthYear);
          setGender(surveyData.gender);
          setClassYear(surveyData.classYear);
          setMajor(surveyData.major);
          setLocation(surveyData.location);
          setBedTime(surveyData.bedTime);
          setWakeTime(surveyData.wakeTime);
          setNoiseLevel(surveyData.noiseLevel);
          setGuestLevel(surveyData.guestLevel);
          setTidiness(surveyData.tidiness);
          setAllergies(surveyData.allergies);
          setAccomodations(surveyData.accomodations);
          setWindow(surveyData.window);
          setAnimal(surveyData.animal);
          setParty(surveyData.party);
        }


      } else {
        console.log('not signed in')
      }
      
    });

    // async function getSurveyData() {
    //   const surveyData = (await getDoc(doc(db, "users", uid))).data().responses;
    //   console.log(uid)
    //   console.log(surveyData)
    //   if (surveyData) {
    //     // setName(surveyData.name);
    //     setBirthYear(surveyData.birthYear);
    //     setGender(surveyData.gender);
    //     setClassYear(surveyData.classYear);
    //     setMajor(surveyData.major);
    //     setLocation(surveyData.location);
    //     setBedTime(surveyData.bedTime);
    //     setWakeTime(surveyData.wakeTime);
    //     setNoiseLevel(surveyData.noiseLevel);
    //     setGuestLevel(surveyData.guestLevel);
    //     setTidiness(surveyData.tidiness);
    //     setAllergies(surveyData.allergies);
    //     setAccomodations(surveyData.accomodations);
    //     setWindow(surveyData.window);
    //     setAnimal(surveyData.animal);
    //     setParty(surveyData.party);
    //   }
    // }
    // getSurveyData();
    
  }, [auth]);
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!birthYear || !gender || !classYear || !major || !location || !bedTime || !wakeTime || !noiseLevel || !guestLevel || !tidiness || !accomodations || !allergies) {
      setSnackbar({status: true, message: `Please fill in all required fields.`});
      return;
    }
    // if (allergies === undefined) {
    //   console.log('do we get here?')
    //   setAllergies("None")
    // }

    // if (accomodations === undefined) {
    //   setAccomodations("None")
    // }

    const surveyData = {
        birthYear,
        gender,
        classYear,
        major,
        location,
        bedTime,
        wakeTime,
        noiseLevel,
        guestLevel,
        tidiness,
        allergies,
        accomodations,
        window,
        animal,
        party,
      };
      try {
        // const docRef = await addDoc(collection(db, "surveyResponses"), surveyData);
        console.log(surveyData);
        await updateDoc(doc(db, "users", user.uid), {'responses': surveyData})
        // localStorage.setItem("surveyData", JSON.stringify(surveyData));
        // console.log("Survey submitted with ID: ", docRef.id);
        //setSuccess(true);
        history.push('/profile')
      } catch (error) {
        console.error("Error adding survey: ", error);
      }
      

  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleBirthYearChange(event) {
    const value = event.target.value.replace(/[^0-9]/g, '').slice(0, 4); // Only allow 4 digits
    setBirthYear(value);
  }

  function handleClassYearChange(event) {
    setClassYear(event.target.value);
  }

  function handleMajorChange(event) {
    setMajor(event.target.value);
  }

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleBetTimeChange(event) {
    setBedTime(event.target.value);
  }
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
                <div className='originalsettings-container'>
                <Link to="/profile"><button class="settingsbutton settingsbutton-goBack">Back to Profile<br></br><span className='tinytext'>&#x28;Does <u><b>NOT</b></u> Save Changes!&#x29;</span></button></Link>
                        <div className='settingspage-header'>Settings</div>
                    <br></br>
                    <div className='settingsSaveChangessmaller-container'>
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
                        <div className='originalsettingstextinputheader'><b>Current Email:</b> {Email}</div>
                        <TextField
                            fullWidth
                            id="email"
                            label="New email"
                            type="email"
                            size="small"
                            //onChange={}
                        />
                    <div className='originalsettingstextinputheader'><b>Current Phone Number:</b> {Phone}</div>
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
                        <div className='originalsettingstextinputheader'><b>New Password:</b> {Password}</div>
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
}

export default SettingsPage