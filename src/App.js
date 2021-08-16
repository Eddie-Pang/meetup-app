import { BrowserRouter as Router , Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'filepond/dist/filepond.min.css';
import HomepagePages from './Components/Home/HomepagePages';
import LoginPage from './Components/login/LoginPage';
import Profile from './Components/Profile/Profile';
import Result from './Components/Search/Result';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import CreateGroups from './Components/CreateGroups/CreateGroups';
import EventViewer from './Components/EventViewer/EventViewer';
import GoogleRedirect from './Components/login/GoogleRedirect';
import MyEventsPage from './Components/MyEvents/MyEventsPage';
import {useAuth} from './Context/AuthContext';
import EventFinder from './Components/Home/EventFinder';


function App() {
  const { isAuth } = useAuth();
  
  return (
    <div className="container-fluid">
    <Router>
      <AuthProvider>
        <Switch>
          {/* <Route exact path="/" component={Homepage}/> */}
          {/* <Route path="/result" component={Result} /> */}
          {/* <Route path="/newgroup" component={CreateGroups}/> */}
          {/* <Route path="/event-viewer" component={EventViewer}/>   */}
          <Route path = '/google' component = {GoogleRedirect}/>
          <Route exact path={["/", '/upcomingEvents', '/find']} component = {props =><HomepagePages {...props}/>}/>  
          <Route path={["/signup", "/login","/forgotPassword"]} render={(props) => (<LoginPage {...props}></LoginPage>)}></Route>
          <Route path="/result" component = {props =><Result {...props}/>}/>
          <Route path="/event-viewer" component = {props =><EventViewer {...props}/>}/>   
          {/* <Route path="/find" component = {props =><EventFinder {...props}/>}/> */}
          {/* <Route path="/find" component={EventFinder}/> */}
          <PrivateRoute path="/profile" component={Profile} />
          {isAuth ? <Route path="/newGroup" component = {props =><CreateGroups {...props}/>}/> :<Redirect to="/login" />}
          {isAuth ? <Route path={["/myEvents","/myEvents/previous"]} render={(props) => (<MyEventsPage {...props}></MyEventsPage>)}></Route> : <Redirect to="/login" />}
          {/* <Route path="/google" component = {props =><GoogleRedirect {...props}/>}/> */}
          
          


        </Switch>
      </AuthProvider>
    </Router>
    
    </div>
  )
}

export default App;
