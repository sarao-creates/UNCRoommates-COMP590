import TextField from '@mui/material/TextField';
import LoginTitle from '../WelcomePage/LoginTitle';
import Button from '@mui/material/Button';
import './index.css';
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase.js'; 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {

    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [pwd, setPWD] = useState('');
    const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
    });

    const handlePWD = (event) => {
        setPWD(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, pwd).then((userCredential) => {
            console.log('Sign in successful');
            history.push('/profile');
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            setSnackbar({status: true, message: `${errorCode} - ${errorMessage}`});

            console.log(`${errorCode} - ${errorMessage}`);
        })
    }
    
        
    
    return (
        <div className="full-screen">
            <LoginTitle></LoginTitle>
            <div className="login-text">Login to Your Account</div>
            <div className='login-input'>
                <br></br>
                <TextField 
                    fullWidth
                    id="outlined-email-input" 
                    label="Email" 
                    type="email" 
                    size="small"
                    onChange={handleEmail}
                />
                <br></br>
                <br></br>
                <TextField 
                    fullWidth
                    id="outlined-password-input" 
                    label="Password" 
                    type="password" 
                    size="small"
                    autoComplete="current-password" 
                    onChange={handlePWD} 
                />
                <br></br>
                <br></br>
                <div className='textpadding'>
                <div><button class="button" onClick={handleSignIn}>Login</button></div>
                <h4>Don't Have an Account? <Link to='/create-account'><u>Click Here to Sign Up!</u></Link></h4>
            </div>
            </div>
            <Snackbar open={snackbar.status} autoHideDuration={7500} onClose={() => setSnackbar({status: false})}> 
                    <Alert severity='info'>{snackbar.message}</Alert>
            </Snackbar>
            <br></br>
        </div>
    )
}

export default LoginPage;