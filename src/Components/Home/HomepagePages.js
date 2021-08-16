import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Homepage from './Homepage';
import SeeAllUpcomingEvents from './SeeAllUpcomingEvents';

import {handleRenderEventViewer} from '../../util/functionStore'

import EventFinder from './EventFinder';

export default function HomePagePages(props) {
    
    const { history } = props;
    // const {events} = useUserEventsContext();
   
    const method = 'upcoming'
   

    
    
    
    return (
        <Switch>
           <Route exact path="/" render = {(props) => (<Homepage {...props} method = {method} history = {history} handleRenderEventViewer={handleRenderEventViewer}/>)} />
           <Route path="/upcomingEvents" render = {props =><SeeAllUpcomingEvents {...props} method = {method} history = {history} handleRenderEventViewer= {handleRenderEventViewer} />}/>
           <Route path="/find" component = {props =><EventFinder {...props}/>}/>
           
        </Switch>
       
    );
}
