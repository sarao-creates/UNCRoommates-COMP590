import './index.css'
import Title from './Title'
import React, { useState , useEffect} from 'react';
//import { Link } from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
import db from '../Firebase/firebase.js';
import { addDoc, doc, getDoc, collection } from "firebase/firestore";

import {
  Grid,
  Paper, 
  Typography
} from '@mui/material';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
//import db from '../Firebase/firebase.js';
//import { collection, addDoc } from "firebase/firestore";

function ViewMatches() {
    const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Function to fetch all survey responses from Firebase
    const getResponses = async () => {
        const responseRef = getDoc(collection(db,"surveyResponses"));
        const snapshot = await responseRef.get();
        const newResponses = [];
        let i = 1;
        snapshot.forEach((doc) => {
            const response = doc.data();
            response.id = i;
            i++;
            newResponses.push(response);
        });
        setResponses(newResponses);
    };

    getResponses();
  }, []);
  console.log(setResponses);

  
  
    // Function to calculate score between two responses





    // Function to sort responses based on their scores





    // Function to generate a list of displayed info with the same format as 'profiles'.
    const profiles = [
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
      ];
      const handleProfileClick = (id) => {
        console.log(`Clicked profile with ID ${id}`);
      };
    return (
        <div>
            <Title></Title>
            <Grid container spacing={2} sx={{ width: "66.66%", float:'right'}}>
      {profiles.map((profile) => (
        <Grid key={profile.order} item xs={6}>
          <Paper
            elevation={3}
            sx={{ height: "80%", padding: 2, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
            onClick={() => handleProfileClick(profile.id)}
          >
            <Typography variant="h6" color='#4b9cd3'>{profile.name}</Typography>
            <Typography variant="body2">
              Year: {profile.year} | Age: {profile.age} | Location: {profile.location}
            </Typography>
            <Typography variant="body1"><b>Bio: </b>{profile.bio}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    </div>
    )
}

export default ViewMatches