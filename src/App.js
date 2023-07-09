import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "filepond/dist/filepond.min.css";
import Homepage from "./Components/Homepage";
import LoginPage from "./Components/login/LoginPage";
import Profile from "./Components/Profile/Profile";
import ResultPage from "./Components/Search/ResultPage";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import CreateGroups from "./Components/CreateGroups/CreateGroups";
import EventViewer from "./Components/EventViewer/EventViewer";
import GoogleRedirect from "./Components/login/GoogleRedirect";
import MyEventsPage from "./Components/MyEvents/MyEventsPage";
import { useAuth } from "./Context/AuthContext";

function App() {
  const { isAuth } = useAuth();

  return (
    <div className="container-fluid">
      <AuthProvider>
        <Routes>
          {/* <Route exact path="/" component={Homepage}/> */}
          {/* <Route path="/result" component={Result} /> */}
          {/* <Route path="/newgroup" component={CreateGroups}/> */}
          {/* <Route path="/event-viewer" component={EventViewer}/>   */}
          {/* <Route path = '/google' component = {GoogleRedirect}/> */}
          <Route path="/" element={<Homepage />} />

          {["/signup", "/login", "/forgotPassword"].map((path, index) => (
            <Route key={index} path={path} element={<LoginPage />} />
          ))}

          <Route path="/result" element={<ResultPage />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/newGroup"
            element={
              isAuth ? <CreateGroups /> : <Navigate replace to="/login" />
            }
          />
          <Route path="/event-viewer" element={<EventViewer />} />
          <Route path="/google" element={<GoogleRedirect />} />

          <>
            {["/myEvents", "/myEvents/previous"].map((path, index) => (
              <Route
                key={index}
                path={path}
                element={
                  isAuth ? <MyEventsPage /> : <Navigate replace to="/login" />
                }
              />
            ))}
          </>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

// <Router>
// <AuthProvider>
//   <Switch>
//     {/* <Route exact path="/" component={Homepage}/> */}
//     {/* <Route path="/result" component={Result} /> */}
//     {/* <Route path="/newgroup" component={CreateGroups}/> */}
//     {/* <Route path="/event-viewer" component={EventViewer}/>   */}
//     {/* <Route path = '/google' component = {GoogleRedirect}/> */}
//     <Route exact path="/" component = {props =><Homepage {...props}/>}/>
//     <Route path={["/signup", "/login","/forgotPassword"]} render={(props) => (<LoginPage {...props}></LoginPage>)}></Route>
//     <Route path="/result" component = {props =><Result {...props}/>}/>
//     <PrivateRoute path="/profile" component={Profile} />
//     {isAuth ? <Route path="/newGroup" component = {props =><CreateGroups {...props}/>}/> :<Redirect to="/login" />}
//     <Route path="/event-viewer" component = {props =><EventViewer {...props}/>}/>
//     <Route path="/google" component = {props =><GoogleRedirect {...props}/>}/>
//     {isAuth ? <Route path={["/myEvents","/myEvents/previous"]} render={(props) => (<MyEventsPage {...props}></MyEventsPage>)}></Route> : <Redirect to="/login" />}

//   </Switch>
// </AuthProvider>
// </Router>
