import React from "react";
import NavBar from "../NavBar";
import { loadingIcon } from '../../util/imgPicker'
import MyOwnEvents from './MyOwnEvents'
import MyJoinedEvents from './MyJoinedEvents'
import { useAuth } from '../../Context/AuthContext';

export default function MyEventsView(props){
   
    const {currentUser, loading} = useAuth();

    const ownEvents = currentUser?.ownEvents;
    const joinedEvents = currentUser?.events
    const totalEvents = ownEvents?.length+joinedEvents?.length;
    const {handleViewEvent} = props;

    return(
        <>
        
        {!loading
            ?  
            <>
                <NavBar/>
                <br/>
                {totalEvents>0
                    ?  
                        <>
                            <h3>You currently have {totalEvents} event(s)</h3> 
                            <hr/>
                            <MyJoinedEvents handleViewEvent={handleViewEvent} events={joinedEvents}/>
                            <MyOwnEvents handleViewEvent={handleViewEvent} events={ownEvents}/>
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

