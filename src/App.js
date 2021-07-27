import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'filepond/dist/filepond.min.css';
import Homepage from './Components/Homepage';
import LoginPage from './Components/login/LoginPage';
import Profile from './Components/Profile';
import Result from './Components/Search/Result';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import CreateGroups from './Components/CreateGroups';
import EventViewer from './Components/EventViewer/EventViewer';
import GoogleRedirect from './Components/GoogleRedirect';


function App() {
  return (
    <div className="container-fluid">
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path={["/signup", "/login","/forgotPassword"]} render={(props) => (<LoginPage {...props}></LoginPage>)}></Route>
          <Route path="/result" component={Result} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/newgroup" component={CreateGroups}/>
          <Route path="/event-viewer" component={EventViewer}/>        
          <Route path = '/google' component = {GoogleRedirect}/>
        </Switch>
      </AuthProvider>
    </Router>
    
    </div>
  )
}

export default App;
