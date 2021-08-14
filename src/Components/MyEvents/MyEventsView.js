import React from "react";
import NavBar from "../NavBar";
import { loadingIcon } from '../../util/imgPicker'
import MyHostedEvents from './MyHostedEvents'
import MyJoinedEvents from './MyJoinedEvents'
import { useAuth } from '../../Context/AuthContext';
import useGetAllEvents from "../../hooks/useGetAllEvents"


export default function MyEventsView(props){
   
    const {currentUser, loading} = useAuth();
    const {handleRenderEventViewer, history, events, method} = props;
    const {user} = events
   
    const {joinedEvents, hostedEvents, status} = useGetAllEvents(user?._id)
    
    const totalEvents = hostedEvents?.length+joinedEvents?.length;
    

    return(
        <>
            {!loading&&status==='received'
            ?  
                <>
                    <NavBar/>
                    <br/>
                    {totalEvents>0
                        ?  
                            <>
                                <h3>You currently have {totalEvents} event(s)</h3> 
                                <hr/>
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
            :
                <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
            }
      
        </>
    )
}

