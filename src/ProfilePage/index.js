import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './index.css';

function ProfilePage() {
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
            <div className='profile-container'>
                <div className='left-container'>
                    <div className='image-container'></div>
                </div>
                <div className='right-container'>
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
                                <td>Allergies</td>
                            </tr>
                            <tr>
                                <td>{gender} {wake} {party}</td>
                                <td>{allergies}</td>
                            </tr>
                        </table>
                    </div>
                </div>
    
                <div className='bio-container'>
                    {bio}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage