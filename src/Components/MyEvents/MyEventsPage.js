import React from 'react';
import { Switch, Route} from 'react-router-dom';

import MyPreviousEvents from './MyPreviousEvents';
import MyEventsView from './MyEventsView';

function MyEventsPage(props) {

    const { history } = props;
  
    function handleRenderEventViewer(event){
        history.push(`/event-viewer/?&event=${event._id}`)
    };

    return (
        <Switch>
           <Route path="/myEvents" render = {(props) => (<MyEventsView {...props} handleViewEvent={handleRenderEventViewer}></MyEventsView>)} />
           <Route path="/myEvents/previous" component = {MyPreviousEvents}/>
        </Switch>
       
    );
}

export default MyEventsPage;