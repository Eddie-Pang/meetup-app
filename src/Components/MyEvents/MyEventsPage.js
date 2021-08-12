import React from 'react';
import { Switch, Route} from 'react-router-dom';
import MyPreviousEvents from './MyPreviousEvents';
import MyEventsView from './MyEventsView';
// import MyOwnEvents from './MyOwnEvents';
import {useUserEventsContext } from '../../Context/UserDataContext';
import {handleRenderEventViewer} from '../../services/userService'

export default function MyEventsPage(props) {

    const { history } = props;
    const {events} = useUserEventsContext();
    const method = 'myEvent'
  
    // function handleRenderEventViewer(event){
    //     console.log(event)
    //     events.handleEventViewer(event)

    //     history.push(`/event-viewer/?&method=myEvent&&event=${event._id}`)
    // };
    
    return (
        <Switch>
           <Route path="/myEvents" render = {(props) => (<MyEventsView {...props} history = {history} events = {events} method={method}  handleRenderEventViewer={handleRenderEventViewer}></MyEventsView>)} />
           <Route path="/myEvents/previous" component = {props =><MyPreviousEvents {...props}/>}/>
           {/* <Route path="/myOwnEvents" render = {(props) => (<MyOwnEvents {...props} handleViewEvent={handleRenderEventViewer}></MyOwnEvents>)} /> */}
           
        </Switch>
       
    );
}
