import React from 'react'
import './index.css'
import Title from './Title'
import { Link } from 'react-router-dom'

function WelcomePage() {
    return (
        <div className='full-screen'>
            <Title></Title>
            <div className='welcome-container'>
                <div className='welcome-title'>Welcome</div>
                <div className='Welcome-text'>UNCRoommates is dedicated to take the stress out of finding a roommate at UNC Chapel Hill</div>
                <div className='welcome-description'>Discover students who are <b>automatically matched</b> with your roommate needs in just a few steps
                    <ul>
                        <li>Take a survey</li>
                        <li>Create a free-text bio</li>
                        <li>Upload an optional photo</li>
                        <li>View your matches</li>
                    </ul>
                </div>

                <Link to='/login'><button>Login or Sign Up</button></Link>
            </div>
        </div>
    )
}

export default WelcomePage;