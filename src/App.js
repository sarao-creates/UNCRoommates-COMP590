import {BrowserRouter as Router, Route} from 'react-router-dom'
import WelcomePage from './WelcomePage';
import ProfilePage from './ProfilePage';
const ProfilePath = '/profile';
const WelcomePath = '/welcome';



function App() {
  return (
    <Router>
      <Route path={WelcomePath} component={WelcomePage}></Route>
      <Route path={ProfilePath} component={ProfilePage}></Route>
    </Router>

  );
}

export default App;