import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import WelcomePage from './WelcomePage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import Survey from './Survey';
import Settings from './SettingsPage';
import CreateAccountPage from './CreateAccountPage';
import OnboardingBioPage from './OnboardingBioPage';
import OnboardingPhotoPage from './OnboardingPhotoPage';
import ViewMatches from './ViewMatches';
import MatchedUserProfilePage from './MatchedUserProfilePage';

const ProfilePath = '/profile';
const WelcomePath = '/welcome';
const LoginPath = '/login';
const SurveyPath = '/survey';
const SettingsPath = '/settings'
const CreateAccountPath = '/create-account';
const OnboardingBioPath = '/onboarding-bio';
const OnboardingPhotoPath = '/onboarding-photo';
const ViewMatchesPath = '/viewmatches'
const MatchedUserProfilePath = '/matcheduserprofile/:id';

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
      <Route path={OnboardingBioPath} component={OnboardingBioPage}></Route>
      <Route path={OnboardingPhotoPath} component={OnboardingPhotoPage}></Route>
      <Route path={ViewMatchesPath} component={ViewMatches}></Route>
      <Route path={MatchedUserProfilePath} component={MatchedUserProfilePage}></Route>
      </Switch>
    </Router>
  );
}

export default App;