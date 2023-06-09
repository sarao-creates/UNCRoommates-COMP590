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
import DESIGNSViewMatchesACCEPTED from './DESIGNSViewMatchesACCEPTED';
import DESIGNSViewMatchesDECLINED from './DESIGNSViewMatchesDECLINED';
import MatchedUserProfilePage from './MatchedUserProfilePage';
import DeactivationConfirmPage from './DeactivationConfirmPage';
import ReactivationConfirmPage from './ReactivationConfirmPage';
import EditBioandPhotoPage from './EditBioandPhotoPage';

const ProfilePath = '/profile';
const WelcomePath = '/welcome';
const LoginPath = '/login';
const SurveyPath = '/survey';
const SettingsPath = '/settings'
const CreateAccountPath = '/create-account';
const OnboardingBioPath = '/onboarding-bio';
const OnboardingPhotoPath = '/onboarding-photo';
const ViewMatchesPath = '/viewmatches'
const DESIGNSViewMatchesACCEPTEDPath = '/DESIGNSviewmatchesACCEPTED'
const DESIGNSViewMatchesDECLINEDPath = '/DESIGNSviewmatchesDECLINED'
const MatchedUserProfilePath = '/matcheduserprofile/:id';
const ReactivationConfirmPath = '/reactivationconfirm';
const DeactivationConfirmPath = '/deactivationconfirm';
const EditBioandPhotoPath = '/editbioandphoto';


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
      <Route path={DESIGNSViewMatchesACCEPTEDPath} component={DESIGNSViewMatchesACCEPTED}></Route>
      <Route path={DESIGNSViewMatchesDECLINEDPath} component={DESIGNSViewMatchesDECLINED}></Route>
      <Route path={MatchedUserProfilePath} component={MatchedUserProfilePage}></Route>
      <Route path={DeactivationConfirmPath} component={DeactivationConfirmPage}></Route>
      <Route path={ReactivationConfirmPath} component={ReactivationConfirmPage}></Route>
      <Route path={EditBioandPhotoPath} component={EditBioandPhotoPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
