import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';

import ForgotPassword from './ForgotPassword';

function LoginPage(props) {

    // const history = props.history

    return (
        <Switch>
           <Route path="/login" component = {Login}></Route>
           <Route path="/ForgotPassword" component = {ForgotPassword}></Route>
        </Switch>
       
    );
}

export default LoginPage;