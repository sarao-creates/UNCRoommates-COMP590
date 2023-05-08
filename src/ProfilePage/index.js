import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './index.css';
import Title from '../WelcomePage/Title';
import NavigationTabs from '../NavigationTabs';
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotLoggedIn from '../NotLoggedInPage/index.js';

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
    const [animal, setAnimal] = useState('');
    const [window, setWindow] = useState('');
    const [user, setUser] = useState({});
    const [flag, setFlag] = useState(false)

    const auth = getAuth();




    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                setFlag(true);

                if (docSnap.exists()) {
                    setFirstName(docSnap.data()["firstName"])
                    setLastName(docSnap.data()["lastName"])
                    setBio(docSnap.data()["bio"])
                    setGender(docSnap.data()['responses']["gender"])
                    setBirthday(docSnap.data()['responses']['birthYear'])
                    setLocation(docSnap.data()["responses"]['location'] === "I don't care" ? "Any" : docSnap.data()["responses"]['location'])
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
                setFlag(false);
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
    
    if (flag === true) {
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
                        <Link to='editbioandphoto'><button className='button'>&#x270E; Edit Bio/Photo</button></Link>
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
                                <td className='table-size'>Birth Year</td>
                                <td className='table-size'>Location Preference</td>
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
                                <td className='size' dangerouslySetInnerHTML={{ __html: text }}></td>
                                <td></td>
                                <td className='size'>{allergies}</td>
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
    } else {
        return (
            <NotLoggedIn />
        )
    }
}

export default ProfilePage