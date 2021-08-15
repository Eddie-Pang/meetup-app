import React from "react";
import NavBar from "../NavBar";
import { loadingIcon } from '../../util/imgPicker'
import MyHostedEvents from './MyHostedEvents'
import MyJoinedEvents from './MyJoinedEvents'
// import { useAuth } from '../../Context/AuthContext';
import useGetAllEvents from "../../hooks/useGetAllEvents"



export default function MyEventsView(props){
   
    
    const {loading, handleRenderEventViewer, history, events, method, location:{pathname}} = props;
    const {user} = events
    const {joinedEvents, hostedEvents, status} = useGetAllEvents(user?._id)
    
    const totalEvents = hostedEvents?.length+joinedEvents?.length;

    if (!loading&&status==='received'){
        try {
            switch (pathname) {
    
                case '/myEvents':
                    return RenderAllEvents(handleRenderEventViewer, history, events, joinedEvents, hostedEvents, method, totalEvents);
    
                case '/myEvents/joined':
                    return RenderJoinedEvents(handleRenderEventViewer, history, events, joinedEvents, method);
    
                case '/myEvents/hosted':
                    return RenderHostedEvents(handleRenderEventViewer, history, events, hostedEvents, method)
    
                default:
                    return <div>wait a second</div>
            }
          }
          catch (err) {
            console.log(err);
            return <div>Opps</div>;
          }
        
    }else{
        return <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
    }

    
};
    
const RenderAllEvents = (handleRenderEventViewer, history, events, joinedEvents, hostedEvents, method, totalEvents) => {
    return(
            <>
                <br/>
                {totalEvents>0
                    ?  
                        <>
                            <h3>You currently have {totalEvents} event(s)</h3> 
                            <br/>
                            <MyJoinedEvents handleRenderEventViewer={handleRenderEventViewer} history = {history} events = {events} method={method} joinedEvents={joinedEvents}/>
                            <MyHostedEvents handleRenderEventViewer={handleRenderEventViewer} history = {history} events = {events} method={method} hostedEvents={hostedEvents}/>
                        </>
                    :
                        <div style = {{width: '600px', paddingTop:'20%', margin:'auto', textAlign: 'center'}}>
            
                                <h5>You have no event!</h5>
                                <a className="nav-link" href='/result'>Search</a>
                                
                        </div>
                }        
            </>     
    )
}

const RenderJoinedEvents = (handleRenderEventViewer, history, events, joinedEvents, method) => {
    return(
        <>
            <br/>
            {joinedEvents?.length>0
                ?  
                    <>
                        <h3>You currently have {joinedEvents?.length} joined event(s)</h3> 
                        <br/>
                        <MyJoinedEvents handleRenderEventViewer={handleRenderEventViewer} history = {history} events = {events} method={method} joinedEvents={joinedEvents}/>
                    </>
                :
                    <div style = {{width: '600px', paddingTop:'20%', margin:'auto', textAlign: 'center'}}>
        
                            <h5>You have no joined event!</h5>
                            <a className="nav-link" href='/result'>Search</a>  
                    </div>
            }        
        </>     
    )
}

const RenderHostedEvents = (handleRenderEventViewer, history, events, hostedEvents, method) => {
    return(
        <>
            <br/>
            {hostedEvents?.length>0
                ?  
                    <>
                        <h3>You currently have {hostedEvents?.length} hosted event(s)</h3> 
                        <br/>

                        <MyHostedEvents handleRenderEventViewer={handleRenderEventViewer} history = {history} events = {events} method={method} hostedEvents={hostedEvents}/>
                    </>
                :
                    <div style = {{width: '600px', paddingTop:'20%', margin:'auto', textAlign: 'center'}}>
        
                            <h5>You have no hosted event!</h5>
                            <a className="nav-link" href='/result'>Search</a>  
                    </div>
            }        
        </>     
    )
}

