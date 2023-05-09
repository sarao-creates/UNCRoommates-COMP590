import {db} from '../Firebase/firebase.js';
import React from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './index.css';
import Title from '../WelcomePage/Title';
import NavigationTabs from '../NavigationTabs';
import { Link, useHistory } from "react-router-dom";
import {TextField} from '@mui/material';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function EditBioandPhotoPage() {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [bio, setBio] = useState('')
    const [birthday, setBirthday] = useState('')
    const [location, setLocation] = useState('')
    const [party, setParty] = useState('')
    const [sleep, setSleep] = useState('')
    const [wake, setWake] = useState('')
    const [year, setYear] = useState('')
    const [allergies, setAllergies] = useState('')
    const [animal, setAnimal] = useState('');
    const [window, setWindow] = useState('');
    const [user, setUser] = useState({});

    const [photo, setPhoto] = useState('');


    const history = useHistory();
    //console.log(bioLength);
    

    const auth = getAuth();



    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log(docSnap.data())
                    setFirstName(docSnap.data()["firstName"])
                    setLastName(docSnap.data()["lastName"])
                    setBio(docSnap.data()["bio"])
                    setPhoto(docSnap.data()["photoURL"])
                    setGender(docSnap.data()['responses']["gender"])
                    setBirthday(docSnap.data()['responses']['birthYear'])
                    setLocation(docSnap.data()["responses"]['location'])
                    setParty(docSnap.data()["responses"]["party"])
                    setSleep(docSnap.data()["responses"]["bedTime"])
                    setWake(docSnap.data()["responses"]["wakeTime"])
                    setYear(docSnap.data()["responses"]["classYear"])
                    setAllergies(docSnap.data()["responses"]["allergies"])
                    setAnimal(docSnap.data()["responses"]["animal"])
                    setWindow(docSnap.data()["responses"]["window"])
                  } else {
                    setFirstName("Error")
                }    

            } else {

            }
            
            

            
        });


    }, []);
    let text = '';
    if (gender === 'male') {
        text = text + "<span2>Male</span2>&nbsp;"
    } else if (gender === 'female') {
        text = text + "<span>Female</span>&nbsp;"
    }
    if (wake === "Early") {
        text = text + "<span3>Early Riser</span3>&nbsp;"
    }
    if (sleep === "Late") {
        text = text + "<span4>Night Owl</span4>&nbsp;"
    }
    if (window === "Open") {
        text = text + "<span5>Window Opened</span5>&nbsp;"
    }
    if (window === "Closed") {
        text = text + "<span6>Window Closed</span6>&nbsp;"
    }
    if (party === "I love to party") {
        text = text + "<span7>Party Friendly</span7>&nbsp;"
    }
    //console.log(animal);
    if (animal === "Yes") {
        text = text + "<span8>Animal Friendly</span8>&nbsp;"
    }

    const [bioInfo, setBioInfo] = useState({
        "count": 0,
        "value": "",
    });
    useEffect(() => {
        setBioInfo({"count":bio.length, "value": bio});
    },[bio]);
    //console.log("1");
    
    

    
    // const [file, setFile] = useState("");
    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }

    const validate = () => {
        return (bioInfo["count"] >= 150 & bioInfo["count"] < 1500);
      };

      const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
    });
    
    const handlePhotoURL = (event) => {
        setPhoto(event.target.value);
    }

    const handleSubmit = async () => {
        if (validate() === true) {
            console.log(user)
            await updateDoc(doc(db, "users", user.uid), {"bio":bioInfo["value"], "photoURL":photo})
            history.push('/profile');
        }
        else {
            setSnackbar({status: true, message: `Bio needs to be between 150 and 1500 characters.`});
        }
    }


    
    return (
        <div className='full-screen'>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='profile-container'>
                <div className='left-container'>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='url-container'>
                    <TextField
                        id="url"
                        label="Enter URL of Photo"
                        value={photo}
                        type="email"
                        size="small"
                        style = {{width: 180, paddingLeft:"3px", PaddingRight:"3px"}}
                        onChange={handlePhotoURL}
                    />
                    </div>
                    <br></br>
                </div>
                <div className='right-container'>
                    <br></br>
                <div className='editbutton-container'>
                        <Link to='profile'><button class="button" onClick={handleSubmit} type="button" disabled={!validate()}>Save Changes</button></Link>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='name-container'>
                        <h1>{firstName} {lastName}</h1>
                    </div>
                    <div className='profile-characteristics'>
                        <table>
                            <tr>
                                <td className='table-size'>Year</td>
                                <td>Birth Year</td>
                                <td>Location Preference</td>
                            </tr>
                            <tr>
                                <td>{year}</td>
                                <td>{birthday}</td>
                                <td>{location}</td>
                            </tr>
                            <tr className="blank-row"><td colspan="3"></td></tr>
                            <tr>
                                <td>Identifies as</td>
                                <td></td>
                                <td>Allergies</td>
                            </tr>
                            <tr>
                            <td class='size' dangerouslySetInnerHTML={{ __html: text }}></td>
                                <td></td>
                                <td class='size'>{allergies}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='bio-container'>
                <TextField
                    fullWidth
                    multiline
                    id="bio"
                    defaultValue={bio}
                    type="text"
                    rows={5}
                    className="full_height_Width"
                    onChange={e => setBioInfo({"count": e.target.value.length, "value":e.target.value})}
                />
                <p><b>Character Count: {bioInfo["count"]}</b></p>
                </div>
            </div>
            <Snackbar open={snackbar.status} autoHideDuration={7500} onClose={() => setSnackbar({status: false})}> 
                    <Alert severity='info'>{snackbar.message}</Alert>
            </Snackbar>
            <br></br>
        </div>
    )
}

export default EditBioandPhotoPage;