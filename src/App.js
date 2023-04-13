import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import WelcomePage from './WelcomePage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
const ProfilePath = '/profile';
const WelcomePath = '/welcome';
const LoginPath = '/login';



function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Redirect to='/welcome'></Redirect>
      </Route>
      <Route path={WelcomePath} component={WelcomePage}></Route>
      <Route path={ProfilePath} component={ProfilePage}></Route>
      <Route path={LoginPath} component={LoginPage}></Route>
    </Router>

  );
}

export default App;