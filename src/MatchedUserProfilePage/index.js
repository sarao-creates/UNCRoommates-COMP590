import {db} from '../Firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import './index.css';
import Title from '../WelcomePage/Title';
import NavigationTabs from '../NavigationTabs';
import { Link , useParams } from "react-router-dom";


function MatchedUserProfilePage(profiles) {
    //console.log(profiles.location.state.profile);
    const profile = profiles.location.state.profile;
    console.log(profile);
    //const profile = profiles.find((p) => p.id === id);
    
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

    useEffect(() => {
        if (profile) {
            //console.log("here");
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




    
    return (
        <div className='full-screen'>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='profile-container'>
                <div className='left-container'>
                    <br></br>
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
                    <div className='alignright'>
                    <Link to="/viewmatches"><button class="button button-decline" type="button">&#x2716; Decline</button></Link>
                    </div>
                    <div className='alignright'>
                    <Link to="/viewmatches"><button class="button button-connect" type="button">&#x2714; Connect</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchedUserProfilePage