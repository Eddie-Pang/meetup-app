import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { loadingIcon } from '../../util/imgPicker'
import '../../styles/resultStyle.css';
import NavBar from '../NavBar';
import {isOwned} from '../../util/functionStore'
import useGetUpcomingEvents from '../../hooks/useGetUpcomingEvents'
import {  useUserEventsContext } from '../../Context/UserDataContext';
import { useAuth } from '../../Context/AuthContext';

export default function SeeAllUpcomingEvents(props){
    const {upcomingEvents, status} = useGetUpcomingEvents();
    const {events} = useUserEventsContext();
    const { history, handleRenderEventViewer} = props
    const { currentUser } = useAuth()
    const method = 'upcoming-all'
    
    
    return(
        <>
        {status==='received'
        ?
            <>
                <NavBar/>
                
                <div className = 'results'>
            
                    <br/>
                
                            {upcomingEvents?.map((event, index) => {
                                return(
                                    <div key = {index}>
                                    <Card className = 'result-card' key = {index} type="submit" 
                                        style={isOwned(event, currentUser)?{borderColor:'blue'}:null}
                                        onClick = {()=>handleRenderEventViewer(event, events, method, history)}
                                    >
                                        <Card.Body key = {index}>
                                            <span className="badge badge-primary">{isOwned(event, currentUser)}</span>
                                            <ul><Card.Title>{event.groupName}</Card.Title></ul>
                                            <ul><Card.Text>{event.description}</Card.Text></ul>
                                            <ul><b>Location: </b>{event.location}</ul>
                                            <ul><b>Host: </b>{event.host.name}</ul>      
                                            <ul><b>Date: </b>{event.date}, {event.time}</ul>          
                                        </Card.Body>
                                    </Card><br/>
                                    </div>
                                )   
                            })}    
                </div>
            </>
        :
            <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
        }    
    </>
    )


    // return(
    //     <>
    //     {status==='received'
    //     ?
    //         <>
    //             <NavBar/>
                
    //             <div className = 'results'>
            
    //                 <br/>
                
    //                         {upcomingEvents?.map((event, index) => {
    //                             return(
    //                                 <div key = {index}>
    //                                 <Card className = 'result-card' key = {index} type="submit" 
    //                                     style={isOwned(event.upcomingEvents, currentUser)?{borderColor:'blue'}:null}
    //                                     onClick = {()=>handleRenderEventViewer(event.upcomingEvents, events, method, history)}
    //                                 >
    //                                     <Card.Body key = {index}>
    //                                         <span className="badge badge-primary">{isOwned(event.upcomingEvents, currentUser)}</span>
    //                                         <ul><Card.Title>{event.upcomingEvents.groupName}</Card.Title></ul>
    //                                         <ul><Card.Text>{event.upcomingEvents.description}</Card.Text></ul>
    //                                         <ul><b>Location: </b>{event.upcomingEvents.location}</ul>
    //                                         <ul><b>Host: </b>{event.upcomingEvents.host.name}</ul>      
    //                                         <ul><b>Date: </b>{event.upcomingEvents.date}, {event.upcomingEvents.time}</ul>          
    //                                     </Card.Body>
    //                                 </Card><br/>
    //                                 </div>
    //                             )   
    //                         })}    
    //             </div>
    //         </>
    //     :
    //         <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
    //     }    
    // </>
    // )

}