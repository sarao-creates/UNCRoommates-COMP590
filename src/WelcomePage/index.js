import React from 'react'
import './index.css'
import Title from './Title'
import ViewMatches from '../ViewMatches'

function WelcomePage() {
    return (
        <div>
            <Title></Title>
            <div className='Welcome-text'>UNCRoommates is dedicated to take the stress out of finding a roommate at UNC Chapel Hill</div>
            <ViewMatches></ViewMatches>
        </div>
    )
}

export default WelcomePage;