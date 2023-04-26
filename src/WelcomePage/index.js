import React from 'react'
import './index.css'
import LoginTitle from './LoginTitle'
import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <div><LoginTitle></LoginTitle>
            <div className='full-screen'>
                <div className='welcome-title'>Welcome</div>
                <div className='welcome-subtitle'><i>UNCRoommates is dedicated to taking the stress out of finding a roommate at UNC Chapel Hill.</i></div>
                <div class="dashedline"></div>
                <div className='welcome-container'>
                    <div className='welcome-description'>
                        <div className='welcome-text'>Discover students who are <b>automatically matched</b> with your roommate needs in just a few steps:</div>
                        <br></br>
                        <div className='welcome-text'><span className='bulletpoint'><b>- </b></span>Take a survey</div>
                        <div className='welcome-text'><span className='bulletpoint'><b>- </b></span>Create a free-text bio</div>
                        <div className='welcome-text'><span className='bulletpoint'><b>- </b></span>Upload an optional photo</div>
                        <div className='welcome-text'><span className='bulletpoint'><b>- </b></span>View your matches</div>
                        <br></br>
                        <Link to="/login"><button class="button">Login or Create an Account</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;
