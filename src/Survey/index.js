import './index.css'
import Title from '../WelcomePage/Title'
import NavigationTabs from '../NavigationTabs';
import React, { useState , useEffect } from 'react';
import {
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  MenuItem,
  InputLabel,
  Select,
  Snackbar,
  Alert
} from '@mui/material';

import db from '../Firebase/firebase.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';



//import {Redirect} from 'react-router-dom';
//import { createTheme, ThemeProvider } from '@mui/material/styles';

function Survey() {
  const auth = getAuth();
  const history = useHistory();
  // const user = auth.currentUser;
  
  //const [name, setName] = useState('');

  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const [classYear, setClassYear] = useState('');
  const [major, setMajor] = useState('');
  const [location, setLocation] = useState('');
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [noiseLevel, setNoiseLevel] = useState('');
  const [guestLevel, setGuestLevel] = useState('');
  const [tidiness, setTidiness] = useState('');
  const [allergies, setAllergies] = useState('');
  const [accomodations, setAccomodations] = useState('');
  const [window, setWindow] = useState('');
  const [animal, setAnimal] = useState('');
  const [party, setParty] = useState('');
  // const [setError] = useState('');
  const [user, setUser] = useState({});
  const [snackbar, setSnackbar] = useState({
    status: false,
    message: '',
  })

  useEffect(() => {
    // const surveyData = JSON.parse(localStorage.getItem("surveyData"));
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const surveyData = (await getDoc(doc(db, "users", user.uid))).data().responses;
        console.log(user.uid)
        console.log(surveyData)
        if (surveyData) {
          // setName(surveyData.name);
          setBirthYear(surveyData.birthYear);
          setGender(surveyData.gender);
          setClassYear(surveyData.classYear);
          setMajor(surveyData.major);
          setLocation(surveyData.location);
          setBedTime(surveyData.bedTime);
          setWakeTime(surveyData.wakeTime);
          setNoiseLevel(surveyData.noiseLevel);
          setGuestLevel(surveyData.guestLevel);
          setTidiness(surveyData.tidiness);
          setAllergies(surveyData.allergies);
          setAccomodations(surveyData.accomodations);
          setWindow(surveyData.window);
          setAnimal(surveyData.animal);
          setParty(surveyData.party);
        }


      } else {
        console.log('not signed in')
      }
      
    });

    // async function getSurveyData() {
    //   const surveyData = (await getDoc(doc(db, "users", uid))).data().responses;
    //   console.log(uid)
    //   console.log(surveyData)
    //   if (surveyData) {
    //     // setName(surveyData.name);
    //     setBirthYear(surveyData.birthYear);
    //     setGender(surveyData.gender);
    //     setClassYear(surveyData.classYear);
    //     setMajor(surveyData.major);
    //     setLocation(surveyData.location);
    //     setBedTime(surveyData.bedTime);
    //     setWakeTime(surveyData.wakeTime);
    //     setNoiseLevel(surveyData.noiseLevel);
    //     setGuestLevel(surveyData.guestLevel);
    //     setTidiness(surveyData.tidiness);
    //     setAllergies(surveyData.allergies);
    //     setAccomodations(surveyData.accomodations);
    //     setWindow(surveyData.window);
    //     setAnimal(surveyData.animal);
    //     setParty(surveyData.party);
    //   }
    // }
    // getSurveyData();
    
  }, [auth]);
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!birthYear || !gender || !classYear || !major || !location || !bedTime || !wakeTime || !noiseLevel || !guestLevel || !tidiness || !accomodations || !allergies) {
      setSnackbar({status: true, message: `Please fill in all required fields.`});
      return;
    }
    // if (allergies === undefined) {
    //   console.log('do we get here?')
    //   setAllergies("None")
    // }

    // if (accomodations === undefined) {
    //   setAccomodations("None")
    // }

    const surveyData = {
        birthYear,
        gender,
        classYear,
        major,
        location,
        bedTime,
        wakeTime,
        noiseLevel,
        guestLevel,
        tidiness,
        allergies,
        accomodations,
        window,
        animal,
        party,
      };
      try {
        // const docRef = await addDoc(collection(db, "surveyResponses"), surveyData);
        console.log(surveyData);
        await updateDoc(doc(db, "users", user.uid), {'responses': surveyData})
        const currentSurvey = "surveyData" + user.uid;
        localStorage.setItem(currentSurvey, JSON.stringify(surveyData));
        // console.log("Survey submitted with ID: ", docRef.id);
        //setSuccess(true);
        history.push('/profile')
      } catch (error) {
        console.error("Error adding survey: ", error);
      }
      

  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleBirthYearChange(event) {
    const value = event.target.value.replace(/[^0-9]/g, '').slice(0, 4); // Only allow 4 digits
    setBirthYear(value);
  }

  function handleClassYearChange(event) {
    setClassYear(event.target.value);
  }

  function handleMajorChange(event) {
    setMajor(event.target.value);
  }

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleBetTimeChange(event) {
    setBedTime(event.target.value);
  }

  function handleWakeTimeChange(event) {
    setWakeTime(event.target.value);
  }

  function handleNoiseLevelChange(event) {
    setNoiseLevel(event.target.value);
  }

  function handleGuestLevelChange(event) {
    setGuestLevel(event.target.value);
  }

  function handleTidinessChange(event) {
    setTidiness(event.target.value);
  }

  function handleAllergiiesChange(event) {
    setAllergies(event.target.value);
  }

  function handleAccomodationsChange(event) {
    
    setAccomodations(event.target.value);
    
  }

  function handleWindowChange(event) {
    setWindow(event.target.value);
  }

  function handleAnimalChange(event) {
    setAnimal(event.target.value);
  }

  function handlePartyChange(event) {
    setParty(event.target.value);
  }

/*   function handleNameChange(event) {
    setName(event.target.value);
  } */

  return (
    <div>
        <Title></Title>
        <NavigationTabs></NavigationTabs>
        <br></br>
        <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center" height="100vh" alignitems="center">
        <p>Please take a short survey for more accurate matches. The questions with <span style={{ color: 'red' }}>*</span> are required.</p>
      <Grid item xs={7}>
            <TextField
              required
              fullWidth
              type="text"
              id="birth-year"
              label="1. What is your birth year?"
              variant="outlined"
              value={birthYear}
              onChange={handleBirthYearChange}
              helperText="Please enter your birth year (YYYY)"
            />
          </Grid>
{/*            <Grid item xs={7}>
            <TextField
              required
              fullWidth
              type="text"
              id="name"
              label="2. Please indicate your first and last name."
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              helperText="Please enter your first and last name"
            />
          </Grid>  */}
        <Grid item xs={7}>
          <FormControl component="fieldset">
            <FormLabel component="legend">2. What is your Gender indicated to UNC?<span style={{ color: 'red' }}>*</span>&nbsp;<span style={{ color: 'red' }}>(Tag)</span></FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
            <div style={{ display: "flex", alignItems: "center" }}><FormControlLabel value="male" control={<Radio required />} label="Male" /><td className='size'><span2>Male</span2></td></div>
            <div style={{ display: "flex", alignItems: "center" }}><FormControlLabel value="female" control={<Radio required />} label="Female" /><td className='size'><span>Female</span></td></div>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">3. What is your class year?<span style={{ color: 'red' }}>*</span></FormLabel>
              <RadioGroup aria-label="classYear" name="classYear" value={classYear} onChange={handleClassYearChange}>
                <FormControlLabel value="2028" control={<Radio required/>} label="2028" />
                <FormControlLabel value="2027" control={<Radio required/>} label="2027" />
                <FormControlLabel value="2026" control={<Radio required/>} label="2026" />
                <FormControlLabel value="2025" control={<Radio required/>} label="2025" />
                <FormControlLabel value="2024" control={<Radio required/>} label="2024" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <InputLabel >4. What is your primary major?<span style={{ color: 'red' }}>*</span></InputLabel>
              <Select value={major} onChange={handleMajorChange}>
                <MenuItem value="Undecided">Undecided</MenuItem>
                <MenuItem value="African, African American, and Diaspora Studies">African, African American, and Diaspora Studies</MenuItem>
                <MenuItem value="American Studies">American Studies</MenuItem>
                <MenuItem value="Anthropology">Anthropology</MenuItem>
                <MenuItem value="Archaeology">Archaeology</MenuItem>
                <MenuItem value="Art History">Art History</MenuItem>
                <MenuItem value="Asian Studies">Asian Studies</MenuItem>
                <MenuItem value="Biology">Biology</MenuItem>
                <MenuItem value="Biomedical and Health Sciences Engineering">Biomedical and Health Sciences Engineering</MenuItem>
                <MenuItem value="Biostatistics">Biostatistics</MenuItem>
                <MenuItem value="Business Administration">Business Administration</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="Classics">Classics</MenuItem>
                <MenuItem value="Clinical Laboratory Science">Clinical Laboratory Science</MenuItem>
                <MenuItem value="Communication Studies">Communication Studies</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Contemporary European Studies">Contemporary European Studies</MenuItem>
                <MenuItem value="Dental Hygiene">Dental Hygiene</MenuItem>
                <MenuItem value="Dramatic Art">Dramatic Art</MenuItem>
                <MenuItem value="Economics">Economics</MenuItem>
                <MenuItem value="English and Comparative Literature">English and Comparative Literature</MenuItem>
                <MenuItem value="Environmental Health Sciences">Environmental Health Sciences</MenuItem>
                <MenuItem value="Environmental Science">Environmental Science</MenuItem>
                <MenuItem value="Exercise and Sport Science">Exercise and Sport Science</MenuItem>
                <MenuItem value="Geography">Geography</MenuItem>
                <MenuItem value="Geological Sciences">Geological Sciences</MenuItem>
                <MenuItem value="Germanic and Slavic Languages and Literatures">Germanic and Slavic Languages and Literatures</MenuItem>
                <MenuItem value="Global Studies">Global Studies</MenuItem>
                <MenuItem value="Health Policy and Management">Health Policy and Management</MenuItem>
                <MenuItem value="History">History</MenuItem>
                <MenuItem value="Human and Organizational Leadership Development">Human and Organizational Leadership Development</MenuItem>
                <MenuItem value="Human Development and Family Studies">Human Development and Family Studies</MenuItem>
                <MenuItem value="Information Science">Information Science</MenuItem>
                <MenuItem value="Interdisciplinary Studies">Interdisciplinary Studies</MenuItem>
                <MenuItem value="Latin American Studies">Latin American Studies</MenuItem>
                <MenuItem value="Linguistics">Linguistics</MenuItem>
                <MenuItem value="Management and Society">Management and Society</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Media and Journalism">Media and Journalism</MenuItem>
                <MenuItem value="Medical Anthropology">Medical Anthropology</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Neuroscience">Neuroscience</MenuItem>
                <MenuItem value="Nursing">Nursing</MenuItem>
                <MenuItem value="Peace, War, and Defense">Peace, War, and Defense</MenuItem>
                <MenuItem value="Philosophy">Philosophy</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Political Science">Political Science</MenuItem>
                <MenuItem value="Psychology">Psychology</MenuItem>
                <MenuItem value="Public Policy">Public Policy</MenuItem>
                <MenuItem value="Radiologic Science">Radiologic Science</MenuItem>
                <MenuItem value="Religious Studies">Religious Studies</MenuItem>
                <MenuItem value="Romance Languages">Romance Languages</MenuItem>
                <MenuItem value="Sociology">Sociology</MenuItem>
                <MenuItem value="Statistics and Analytics">Statistics and Analytics</MenuItem>
                <MenuItem value="Studio Art">Studio Art</MenuItem>
                <MenuItem value="Women and Gender Studies">Women and Gender Studies</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">5. Where on campus do you prefer to live?<span style={{ color: 'red' }}>*</span></FormLabel>
              <RadioGroup aria-label="location" name="location" value={location} onChange={handleLocationChange}>
                <FormControlLabel value="South Campus" control={<Radio required/>} label="South Campus (Ehaus, Craige, HoJo, Rams, etc.)" />
                <FormControlLabel value="Middle Campus" control={<Radio required/>} label="Middle Campus (Carmichael, Avery, Teague, etc.)" />
                <FormControlLabel value="North Campus" control={<Radio required/>} label="North Campus (Cobb, Graham, Connor, etc.)" />
                <FormControlLabel value="I don't care" control={<Radio required/>} label="I don't care" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">6. What time do you typically go to bed?<span style={{ color: 'red' }}>*</span></FormLabel>
              <RadioGroup aria-label="bedTime" name="bedTime" value={bedTime} onChange={handleBetTimeChange}>
                <FormControlLabel value="Early" control={<Radio required/>} label="7:00pm - 10:00pm (Early)" />
                <FormControlLabel value="Regular" control={<Radio required/>} label="10:00pm - 1:00am (Regular)" />
                <div style={{ display: "flex", alignItems: "center" }}><FormControlLabel value="Late" control={<Radio required/>} label="1:00am - 4:00 am (Late)" /><td className='size'><span4>Night Owl</span4></td></div>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">7. What time do you typically wake up?<span style={{ color: 'red' }}>*</span></FormLabel>
              <RadioGroup aria-label="wakeTime" name="wakeTime" value={wakeTime} onChange={handleWakeTimeChange}>
                <div style={{ display: "flex", alignItems: "center" }}><FormControlLabel value="Early" control={<Radio required/>}label="5:00am - 8:00am (Early)" /><td className='size'><span3>Early Riser</span3></td></div>
                <FormControlLabel value="Regular" control={<Radio required/>} label="8:00am - 10:00am (Regular)" />
                <FormControlLabel value="Late" control={<Radio required/>} label="10:00am - 1:00pm (Late)" />
              </RadioGroup>
            </FormControl>
          </Grid>
          
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">8. What is your ideal noise level in the room?<span style={{ color: 'red' }}>*</span></FormLabel>
              <RadioGroup aria-label="noiseLevel" name="noiseLevel" value={noiseLevel} onChange={handleNoiseLevelChange}>
                <FormControlLabel value="Low" control={<Radio required/>} label="Low noise level - I prefer a quiet environment but some background noise is okay." />
                <FormControlLabel value="Moderate" control={<Radio required/>} label="Moderate noise level - I don't mind some noise in my environment and am fine with some background noise." />
                <FormControlLabel value="High" control={<Radio required/>} label="High noise level - I don't mind a noisy environment and can handle a lot of background noise." />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">9. Are you comfortable with having guests over in the room?<span style={{ color: 'red' }}>*</span></FormLabel>
              <RadioGroup aria-label="guestLevel" name="guestLevel" value={guestLevel} onChange={handleGuestLevelChange}>
                <FormControlLabel value="Very uncomfortable" control={<Radio required/>} label="Very uncomfortable - I do not want any guests in the room at any time." />
                <FormControlLabel value="Somewhat uncomfortable" control={<Radio required/>} label="Somewhat uncomfortable - I prefer not to have guests over in the room, but it's not a hard rule." />
                <FormControlLabel value="Somewhat comfortable" control={<Radio required/>} label="Somewhat comfortable - I am okay with having guests over in the room occasionally." />
                <FormControlLabel value="Very comfortable" control={<Radio required/>} label="Very comfortable - I don't mind having guests over in the room at any time." />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">10. How tidy do you keep your living spaces?<span style={{ color: 'red' }}>*</span></FormLabel>
              <RadioGroup aria-label="tidiness" name="tidiness" value={tidiness} onChange={handleTidinessChange}>
                <FormControlLabel value="Very tidy" control={<Radio required/>} label="Very tidy - I like to keep things organized and clean at all times." />
                <FormControlLabel value="Slightly tidy" control={<Radio required/>} label="Slightly tidy - I try to keep things organized, but don't mind a little mess from time to time." />
                <FormControlLabel value="Slightly messy" control={<Radio required/>} label="Slightly messy - I tend to be a little disorganized and may have a few items out of place." />
                <FormControlLabel value="Very messy" control={<Radio required/>} label="Very messy - I am not very concerned with tidiness and may have a lot of clutter." />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <TextField
              
              fullWidth
              type="text"
              id="allergies"
              label="11. Do you have any food restrictions or allergies? (Enter None if none)"
              variant="outlined"
              value={allergies}
              onChange={handleAllergiiesChange}
              helperText="Please enter your food restrictions or allergies (Optional) (Enter None if none)"
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              
              fullWidth
              type="text"
              id="accomodations"
              label="12. Do you you need any other accomodations from your roommate? (Enter None if none)"
              variant="outlined"
              value={accomodations}
              onChange={handleAccomodationsChange}
              helperText="Please enter your desired accomodations (Optional) (Enter None if none)"
            />
          </Grid>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">13. Do you prefer the windows open or closed in your room?<span style={{ color: 'red' }}>(Tag)</span></FormLabel>
              <RadioGroup aria-label="window" name="window" value={window} onChange={handleWindowChange}>
              <div style={{ display: "flex", alignItems: "center" }}><FormControlLabel value="Open" control={<Radio />} label="Open - I prefer to open the windows." /><td className='size'><span5>Window Opened</span5></td></div>
                <FormControlLabel value="Neutral" control={<Radio />} label="Neutral - I don't have any preference." />
                <div style={{ display: "flex", alignItems: "center" }}><FormControlLabel value="Closed" control={<Radio />} label="Closed - I prefer to close the windoes." /><td className='size'><span6>Window Closed</span6></td></div>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">14. Are you going to have an animal in the room?<span style={{ color: 'red' }}>(Tag)</span></FormLabel>
              <RadioGroup aria-label="animal" name="animal" value={animal} onChange={handleAnimalChange}>
              <div style={{ display: "flex", alignItems: "center" }}><FormControlLabel value="Yes" control={<Radio />} label="Yes - There will be an animal living with me." /><td className='size'><span8>Animal Friendly</span8></td></div>
                <FormControlLabel value="No" control={<Radio />} label="No - There will not be an animal living with me." />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">15. What is your stance on parties?<span style={{ color: 'red' }}>(Tag)</span></FormLabel>
              <RadioGroup aria-label="party" name="party" value={party} onChange={handlePartyChange}>
              <div style={{ display: "flex", alignItems: "center" }}><FormControlLabel value="I love to party" control={<Radio />} label="I love to party" /><td className='size'><span7>Party Friendly</span7></td></div>
                <FormControlLabel value="I like to party occasionally" control={<Radio />} label="I like to party occasionally" />
                <FormControlLabel value="I prefer not to party" control={<Radio />} label="I prefer not to party" />
              </RadioGroup>
            </FormControl>
          </Grid>
          
        <Grid item xs={7}>
        <Button style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px',backgroundColor:'#13294b'}}variant='contained'size='medium'type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
      <Snackbar open={snackbar.status} autoHideDuration={7500} onClose={() => setSnackbar({status: false})}> 
        <Alert severity='info'>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default Survey;