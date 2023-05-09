import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './index.css';
import Title from '../WelcomePage/Title';
import NavigationTabs from '../NavigationTabs';
import { Link , useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";


function MatchedUserProfilePage(profiles) {
    //console.log(profiles.location.state.profile);
    const profile = profiles.location.state.profile;
    //console.log(profile);
    //const profile = profiles.find((p) => p.id === id);
    const auth = getAuth();
    const user = auth.currentUser;
    const currentAccepted = "acceptedList" + user.uid;
    const currentDeclined = "declinedList" + user.uid;


    
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
    const [window, setWindow] = useState('');
    const [animal, setAnimal] = useState('');
    const [photoURL, setPhotoURL] = useState('')

    useEffect(() => {
        if (profile) {
            //console.log("here");
            console.log(profile);
            const fn = (profile.name).split(" ")[0];
            const ln = (profile.name).split(" ")[1];
            setFirstName(fn);
            setLastName(ln);
            setGender(profile.gender);
            setBio(profile.bio);
            setBirthday(profile.birthYear);
            setLocation(profile.location);
            setParty(profile.party);
            setSleep(profile.bedTime);
            setWake(profile.wakeTime);
            setYear(profile.classYear);
            setAllergies(profile.allergies);
            setWindow(profile.window);
            setAnimal(profile.animal);
            setPhotoURL(profile.url);
        }


    })

    let text = '';
    if (gender === 'male') {
        text = text + "<span2>Male</span2>&nbsp;"
    } else {
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
    if (animal === "Yes") {
        text = text + "<span8>Animal Friendly</span8>&nbsp;"
    }


    const history = useHistory();

    function handleDecline(name) {
        // change the value of the variable in the previous page
        const declinedList = JSON.parse(localStorage.getItem(currentDeclined));
        const acceptedList = JSON.parse(localStorage.getItem(currentAccepted));
        for (let i = 0; i < acceptedList.length; i++) {
            if (acceptedList[i] === name) {
              acceptedList.splice(i, 1);
              i--;
            }
          }
        if (declinedList.includes(name)) {
            localStorage.setItem(currentDeclined, JSON.stringify(declinedList));
            localStorage.setItem(currentAccepted, JSON.stringify(acceptedList));
            return (history.push('/viewmatches'));
        }
        declinedList.push(name);
        
        localStorage.setItem(currentDeclined, JSON.stringify(declinedList));
        localStorage.setItem(currentAccepted, JSON.stringify(acceptedList));
        history.push('/viewmatches');
      }


      function handleAccept(name) {
        const acceptedList = JSON.parse(localStorage.getItem(currentAccepted));
        const declinedList = JSON.parse(localStorage.getItem(currentDeclined));
        for (let i = 0; i < declinedList.length; i++) {
            if (declinedList[i] === name) {
              declinedList.splice(i, 1);
              i--;
            }
          }
        if (acceptedList.includes(name)) {
            
            localStorage.setItem(currentDeclined, JSON.stringify(declinedList));
            localStorage.setItem(currentAccepted, JSON.stringify(acceptedList));
            history.push('/viewmatches');
            return;
        }
        acceptedList.push(name);
        
        localStorage.setItem(currentDeclined, JSON.stringify(declinedList));
        localStorage.setItem(currentAccepted, JSON.stringify(acceptedList));
        history.push('/viewmatches');
        
      }





    
    return (
        <div className='full-screen'>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='profile-container'>
                <div className='left-container'>
                    <br></br>
                    <br></br>
                    <div className='url-container'>Photo URL: {photoURL}</div>
                    
                </div>
                <div className='right-container'>
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
                                <td class='size' dangerouslySetInnerHTML={{ __html: text }}></td>
                                
                                <td></td>
                                <td class='size'>{allergies}</td>
                            </tr>
                        </table>
                    </div>
                </div>
    
                <div className='bio-container'>
                    {bio}
                    <br></br>
                    <br></br>
                    <div className="buttonsdivider">
                        <div className='alignright'>
                            <button onClick={() => handleDecline(profile.name)} class="button button-acceptdecline" type="button">&#x2716; Decline</button>
                        </div>
                        <div className='alignleft'>
                            <button onClick={() => handleAccept(profile.name)} class="button button-acceptdecline" type="button">&#x2714; Connect</button>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
            <br></br>
        </div>
    )
}

export default MatchedUserProfilePage