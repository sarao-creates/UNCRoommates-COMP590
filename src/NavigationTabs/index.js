import React from 'react'
import { NavLink } from "react-router-dom";
import './index.css';



// Cannot get the navlinks to actually go to the pages. I have researched for hours on how to do this
// and I cannot figure it out.

function NavigationTabs() {
    return (
        <div>
      <ul className="nav"> 
        <li>
          <NavLink activeStyle={{ background:'white', color: '#13294B' }} to="/profile">Account and Bio</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ background:'white', color: '#13294B' }} to="/viewmatches">View Potential Matches</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ background:'white', color: '#13294B' }} to="/survey">Edit Survey</NavLink>
        </li>
      </ul>
    </div>
    );
  }
  
  export default NavigationTabs