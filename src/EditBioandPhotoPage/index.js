import {db} from '../Firebase/firebase.js'
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './index.css';
import Title from '../WelcomePage/Title';
import NavigationTabs from '../NavigationTabs';
import { Link, useHistory } from "react-router-dom";
import {TextField} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getAuth } from "firebase/auth";

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

    const auth = getAuth();
    const user = auth.currentUser;

    const history = useHistory();
    const [bioInfo, setBioInfo] = useState({
        "count": 0,
        "value": "",
    });

    const validate = () => {
        return (bioInfo["count"] >= 150 & bioInfo["count"] < 1500);
      };

      const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
    });

      const handleBio = async () => {
        if (validate() == true) {
            console.log(user)
            await updateDoc(doc(db, "users", user.uid), {"bio":bioInfo["value"]})
            history.push('/survey');
        }
        else {
            setSnackbar({status: true, message: `Bio needs to be between 150 and 1500 characters.`});
        }
    }

    useEffect(() => {

        const docLookup = async () => {
            const docRef = doc(db, "Users", "rkEcudx9k33I5nD8TC9a");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFirstName(docSnap.data()["First Name"])
                setLastName(docSnap.data()["Last Name"])
                setBio(docSnap.data()["Bio"])
                setGender(docSnap.data()["Gender"])
                setBirthday(docSnap.data()["Birthday"])
                setLocation(docSnap.data()["Location Preference"])
                setParty(docSnap.data()["PartyPref"])
                setSleep(docSnap.data()["SleepTime"])
                setWake(docSnap.data()["WakeTime"])
                setYear(docSnap.data()["Year"])
                setAllergies(docSnap.data()["Allergies"])
              } else {
                setFirstName("Error")
            }    
    
        }

        docLookup();

    }, []);
    
    return (
        <div className='full-screen'>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='profile-container'>
                <div className='left-container'>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='image-container'></div>
                </div>
                <div className='right-container'>
                    <br></br>
                <div className='editbutton-container'>
                        <Link to='profile'><button class="button" onClick={handleBio} type="button" disabled={!validate()}>Save Changes</button></Link>
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
                                <td>Birthday</td>
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
                                <td class='size'><span>{gender}</span>&nbsp;&nbsp;<span>{wake}</span>&nbsp;&nbsp;<span>{party}</span></td>
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
                    value={bio}
                    type="text"
                    rows={5}
                    className="full_height_Width"
                    onChange={e => setBioInfo({"count": e.target.value.length, "value":e.target.value})}
                />
                <p><b>Character Count: {bioInfo['count']}</b></p>
                </div>
            </div>
        </div>
    )
}

export default EditBioandPhotoPage;