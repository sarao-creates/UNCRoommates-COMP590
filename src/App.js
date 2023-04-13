import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import WelcomePage from './WelcomePage';
import ProfilePage from './ProfilePage';
import Survey from './Survey';
const ProfilePath = '/profile';
const WelcomePath = '/welcome';
const SurveyPath = '/survey';



function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Redirect to='/welcome'></Redirect>
      </Route>
      <Route path={WelcomePath} component={WelcomePage}></Route>
      <Route path={ProfilePath} component={ProfilePage}></Route>
      <Route path={SurveyPath} component={Survey}></Route>
    </Router>

  );
}

export default App;