import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Homepage from './Homepage';
import SeeAllUpcomingEvents from './SeeAllUpcomingEvents';
import useGetUpcomingEvents from '../../hooks/useGetUpcomingEvents'
import {useUserEventsContext } from '../../Context/UserDataContext';
import {handleRenderEventViewer} from '../../util/functionStore'
import { useAuth } from '../../Context/AuthContext';

export default function HomePagePages(props) {
    const {upcomingEvents, status} = useGetUpcomingEvents(); 
    const { history } = props;
    const {events } = useUserEventsContext();
   
    const method = 'upcoming'
    const { loading, currentUser } = useAuth()

    
    
    
    return (
        <Switch>
           <Route exact path="/" render = {(props) => (<Homepage {...props} currentUser={currentUser} events = {events} method = {method} history = {history} upcomingEvents={upcomingEvents} handleRenderEventViewer={handleRenderEventViewer} loading={loading} />)} />
           <Route path="/upcomingEvents" render = {props =><SeeAllUpcomingEvents {...props} currentUser={currentUser} events = {events} method = {method} history = {history} upcomingEvents={upcomingEvents} status = {status} handleRenderEventViewer= {handleRenderEventViewer} />}/>
        </Switch>
       
    );
}
