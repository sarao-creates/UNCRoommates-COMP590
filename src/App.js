import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import WelcomePage from './WelcomePage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import Survey from './Survey';
import Settings from './SettingsPage';
import CreateAccountPage from './CreateAccountPage';
import ViewMatches from './ViewMatches';

const ProfilePath = '/profile';
const WelcomePath = '/welcome';
const LoginPath = '/login';
const SurveyPath = '/survey';
const SettingsPath = '/settings'
const CreateAccountPath = '/signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/welcome'></Redirect>
        </Route>
        <Route path={WelcomePath} component={WelcomePage}></Route>
        <Route path={ProfilePath} component={ProfilePage}></Route>
        <Route path={LoginPath} component={LoginPage}></Route>
        <Route path={SurveyPath} component={Survey}></Route>
        <Route path={SettingsPath} component={Settings}></Route>
        <Route path={CreateAccountPath} component={CreateAccountPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;