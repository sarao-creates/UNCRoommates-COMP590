import './index.css'
import Title from '../WelcomePage/Title';
import React, { useState , useEffect} from 'react';
import NavigationTabs from '../NavigationTabs';
//import { Link } from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
import db from '../Firebase/firebase.js';
import { getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useHistory } from 'react-router-dom';


import {
  Grid,
  Paper, 
  Typography,
} from '@mui/material';

//import { createTheme, ThemeProvider } from '@mui/material/styles';
//import db from '../Firebase/firebase.js';
//import { collection, addDoc } from "firebase/firestore";

function DESIGNSViewMatchesACCEPTED() {
  const auth = getAuth();
  const user = auth.currentUser;
    const [responses, setResponses] = useState([]);
    //const [sampleResponse, setSampleResponse] = useState('');

    // TODO: we might want to change this sample response to the current user's response.

// The commenten out section pulls survey data from the database, but I can't get the uid stuff working after page refreshes.
// I'll use local data for now
/*     useEffect(() => {
      // const surveyData = JSON.parse(localStorage.getItem("surveyData"));
      async function getSurveyData() {
        const surveyData = (await getDoc(doc(db, "users", user.uid))).data().responses;
        //console.log(user.uid)
        //console.log(surveyData)
        if (surveyData) setSampleResponse(surveyData);
        //console.log(sampleResponse);
      }
      getSurveyData();
      
    }, []); */

    const sampleResponse = JSON.parse(localStorage.getItem("surveyData"));




/*     const sampleResponse = {
        "birthYear": "1999",
        "animal": "No",
        "location": "North Campus",
        "major": "Computer Science",
        "gender": "male",
        "party": "I like to party occasionally",
        "guestLevel": "Somewhat comfortable",
        "classYear": "2026",
        "accomodations": "",
        "tidiness": "Slightly tidy",
        "bedTime": "Early",
        "noiseLevel": "Moderate",
        "allergies": "",
        "wakeTime": "Early",
        "window": "Neutral",
        "id": 0
    } */
    
  useEffect(() => {
    // Function to fetch all survey responses from Firebase
    const getResponses = async () => {
        const responseRef = await getDocs(collection(db,"users"));
        //const snapshot = await responseRef.get();
        let i = 0;
        const newResponses = [];
        responseRef.forEach((doc) => {
            const fn = doc.data().firstName;
            const ln = doc.data().lastName;
            const bio = doc.data().bio;
            const response = doc.data().responses;
            response.id = i;
            response.name = fn + " " + ln;
            response.score = calculateScore(response,sampleResponse)
            response.bio = bio;
            //console.log(response.score);
            newResponses.push(response);
            i++;
            
        });
        setResponses(newResponses);
        
    };

    getResponses();
  });

  //console.log(responses);









  
    // Function to calculate score between two responses
    const calculateScore = (response1, response2) => {
        let score = 0;

        // filtering out users with different gender or different location preference
        if ((response1.gender !== response2.gender) || ((response1.location !== response2.location) && (response1.location !== "I don't care") && (response2.location !== "I don't care"))) {
            return -1;
          }

        // calculate birthYear difference, and add score accordingly
        let birthYear1 = parseInt(response1.birthYear);
        let birthYear2 = parseInt(response2.birthYear);
        let birthYearDiff = Math.abs(birthYear1 - birthYear2);
        if (birthYearDiff <= 1) score += 10;
        else if (birthYearDiff <= 3) score += 5;
        
        // calculate classYear difference, and add score accordingly
        let classYear1 = parseInt(response1.classYear);
        let classYear2 = parseInt(response2.classYear);
        let classYearDiff = Math.abs(classYear1 - classYear2);
        if (classYearDiff === 0) score += 5;
        
        // bedTime calculation
        let bedTime1 = response1.bedTime;
        let bedTime2 = response2.bedTime;
        if (bedTime1 === bedTime2) score += 20;
        else if ((bedTime1 === 'Regular') || (bedTime2 === 'Regular')) score += 7;

        //wakeTime calculation
        let wakeTime1 = response1.wakeTime;
        let wakeTime2 = response2.wakeTime;
        if (wakeTime1 === wakeTime2) score += 20;
        else if ((wakeTime1 === 'Regular') || (wakeTime2 === 'Regular')) score += 7;

        //noiseLevel
        let noiseLevel1 = response1.noiseLevel;
        let noiseLevel2 = response2.noiseLevel;
        if (noiseLevel1 === noiseLevel2) score += 15;
        if ((noiseLevel1 === 'Moderate') || (noiseLevel2 === 'Moderate')) score += 7;

        //guest
        let guest1 = response1.guestLevel;
        let guest2 = response2.guestLevel;
        if (guest1 === guest2) score += 20;
        if (((guest1 === 'Very uncomfortable') || (guest1 === 'Somewhat uncomfortable')) && ((guest2 === 'Very uncomfortable') || (guest2 === 'Somewhat uncomfortable'))) {
            score += 10;
        } else if (((guest1 === 'Very comfortable') || (guest1 === 'Somewhat comfortable')) && ((guest2 === 'Very comfortable') || (guest2 === 'Somewhat comfortable'))) {
            score += 10;
        }

        //tidiness
        let tidy1 = response1.tidiness;
        let tidy2 = response2.tidiness;
        if (tidy1 === tidy2) score += 20;
        if (((tidy1 === 'Very tidy') || (guest1 === 'Slightly tidy')) && ((tidy2 === 'Very tidy') || (tidy2 === 'Slightly tidy'))) {
            score += 10;
        } else if (((tidy1 === 'Very messy') || (tidy1 === 'Slightly messy')) && ((tidy2 === 'Very messy') || (tidy2 === 'Slightly messy'))) {
            score += 10;
        }
        return score;
      };







    // Function to sort responses based on their scores

    responses.sort((a, b) => b.score - a.score);



    // Function to generate a list of displayed info with the same format as 'profiles'.

    const responsesFiltered = responses.filter((r) => (r.score >= 40 && r.score !== 120));
    let j = 1;

    responsesFiltered.forEach((r) => {
        r.order = j;
        j++;
        //console.log(r.score);
    });

    //console.log(responsesFiltered);


  /*   responsesFiltered.forEach((response) => {
        response.bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.";
    }) */






    
    /* const profiles = [
        {
          order: 1,
          name: "Jingtong E",
          year: 2023,
          age: 22,
          location: "North Campus",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.",
        },
        {
          order: 2,
          name: "Sameer Rao",
          year: 2023,
          age: 22,
          location: "North Campus",
          bio: "Suspendisse imperdiet ex et varius tristique. Sed vel nisi vel nunc eleifend auctor eget eu ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.",
        },
        {
          order: 3,
          name: "Brooke Hackney",
          year: 2023,
          age: 22,
          location: "North Campus",
          bio: "In euismod, justo quis pretium pellentesque, elit elit ullamcorper augue, eget laoreet sapien mi in velit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.",
        },
        { 
           order: 4,
           name: "John Doe",
           year: 2023,
           age: 22,
           location: "North Campus",
           bio: "Suspendisse imperdiet ex et varius tristique. Sed vel nisi vel nunc eleifend auctor eget eu ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.",
         },
         {
           order: 5,
           name: "Jane Doe",
           year: 2023,
           age: 22,
           location: "North Campus",
           bio: "Suspendisse imperdiet ex et varius tristique. Sed vel nisi vel nunc eleifend auctor eget eu ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.",
         },
         {
           order: 6,
           name: "Ketan Mayer-Patel",
           year: 2023,
           age: 22,
           location: "North Campus",
           bio: "Suspendisse imperdiet ex et varius tristique. Sed vel nisi vel nunc eleifend auctor eget eu ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor ipsum vel justo maximus lacinia.",
          },
      ]; */
      const history = useHistory();
      const handleProfileClick = (id) => {
        console.log(`Clicked profile with ID ${id}`);
        const profile = responsesFiltered.find(p => p.id===id);
        history.push( `/matcheduserprofile/${id}`, {profile});
      };
      if (user===null) {
        return (
          <div>
          <Title></Title>
          <NavigationTabs></NavigationTabs>
          <div className='centercontainer'>
          <Grid container spacing={3} sx={{ width: "66.66%", float:'right'}}>
              <br></br>
              Please log in or register an account to view matches!
              <br></br>
              Come back later!
          </Grid>
          </div>
      </div>
        )
      }
     if (responsesFiltered.length === 0) {
        return (
            <div>
                <Title></Title>
                <NavigationTabs></NavigationTabs>
                <div className='centercontainer'>
                <Grid container spacing={3} sx={{ width: "66.66%", float:'right'}}>
                    <br></br>
                    Please consider changing your survey responses or wait until we have more users for more matches!
                    <br></br>
                    There are currently {responses.length} users. Come back later!
                </Grid>
                </div>
            </div>
        )
     }

    

    return (
        <div>
            <Title></Title>
            <NavigationTabs></NavigationTabs>
            <div className='centercontainer'>
            <Grid container spacing={3} sx={{ width: "66.66%", float:'right'}}>
      {responsesFiltered.map((profile) => (
        <Grid key={profile.order} item xs={6}>
          <Paper
            elevation={3}
            sx={{ height: "80%", padding: 2, display: "flex", border: "solid green 3px", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
            onClick={() => handleProfileClick(profile.id)}
          >
            <div className="divider">
              <Typography variant="h6" color='#4b9cd3'>{profile.name}</Typography>
              <div className='acceptedText'>
              <Typography variant="h6"><b>&#x2713;</b> ACCEPTED</Typography>
              </div>
            </div>
            <Typography variant="body1">
              Year: {profile.classYear} | Age: {2023-profile.birthYear} | Location: {((profile.location)==="I don't care") ? "Any" : profile.location}
            </Typography>
            <Typography sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 5,
              }}
              variant="body2"><b>Bio: </b>{profile.bio}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    </div>
    </div>
    )
}

export default DESIGNSViewMatchesACCEPTED
