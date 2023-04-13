import TextField from '@mui/material/TextField';
import Title from '../WelcomePage/Title';
import Button from '@mui/material/Button';
import './index.css';

function LoginPage() {
    return (
        <div className="full-screen">
            <Title></Title>
            <h1 className="login-text">Login to Your Account</h1>
            <div className='login-input'>
                <h3>UNC Email:</h3> <TextField id="outlined-email-input" label="Email" type="email" />
                <h3>Password:</h3> <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
                <div><Button variant="contained">Login</Button></div>
                <h4>Don't Have an Account? <u>Click Here to Sign Up!</u></h4>
            </div>
            
        </div>
    )
}

export default LoginPage;