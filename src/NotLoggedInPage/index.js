import './index.css';
import { Link } from "react-router-dom";


function NotLoggedIn() {
    return (
        <div className='full-screen'>
            <div className='message-container'>
                <h3 className='message-heading'>Hi there!</h3>
                <p className='message-text'>It doesn't look like you are logged in. Unfortunately, we can't let you access this page. But if you log in, we might be able to!</p>
                <br></br>
                <Link to='/login'><div className='button-div'><button className='login-button'>Login</button></div></Link>
            </div>

        </div>
    )
}

export default NotLoggedIn;