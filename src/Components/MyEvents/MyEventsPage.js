import React from 'react';
import { Switch, Route} from 'react-router-dom';
import MyPreviousEvents from './MyPreviousEvents';
import MyEventsView from './MyEventsView';
// import MyOwnEvents from './MyOwnEvents';

export default function MyEventsPage(props) {

    const { history } = props;
  
    function handleRenderEventViewer(event){
        history.push(`/event-viewer/?&method=myEvent&Sevent=${event._id}`)
    };
    


    return (
        <Switch>
           <Route path="/myEvents" render = {(props) => (<MyEventsView {...props} handleViewEvent={handleRenderEventViewer}></MyEventsView>)} />
           <Route path="/myEvents/previous" component = {props =><MyPreviousEvents {...props}/>}/>
           {/* <Route path="/myOwnEvents" render = {(props) => (<MyOwnEvents {...props} handleViewEvent={handleRenderEventViewer}></MyOwnEvents>)} /> */}
           
        </Switch>
       
    );
}
