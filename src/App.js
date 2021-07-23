import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'filepond/dist/filepond.min.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Homepage from './Components/Homepage';
import Profile from './Components/Profile';
import Result from './Components/Search/Result';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import CreateGroups from './Components/CreateGroups';

function App() {
  return (
    <div className="container-fluid">
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile" component={Profile} />
          <Route path="/result" component={Result} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/newgroup" component={CreateGroups}/>
        </Switch>
      </AuthProvider>
    </Router>
    
    </div>
  )
}

export default App;
