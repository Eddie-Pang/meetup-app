import React from "react";
import NavBar from "../NavBar";
import { useUserEventsContext } from "../../Context/UserDataContext";
import { Card, Button } from 'react-bootstrap';
import { loadingIcon } from '../../util/imgPicker'

export default function MyEventsView(props){

    const {events} = useUserEventsContext();
    const myEvents = events.events
    
    const {handleViewEvent} = props;

    return(
        <>
        
        {events.status==='received'
            ?    
                <>
                <NavBar/>
                <br/>
                <h3>You currently have {myEvents.length} event(s)</h3> 
                <hr/>
                {myEvents.length>0
                ?
                    <>
                        {myEvents?.map((event, index) => { 
                            return(
                                <div key = {index}>
                                    <Card className = 'result-card' key = {index} type="submit" onClick = {()=>handleViewEvent(event)}>
                                        <Card.Body key = {index}>
                                            <ul><Card.Title>{event.groupName}</Card.Title></ul>
                                            <ul><Card.Text>{event.description}</Card.Text></ul>
                                            <ul><b>Location: </b>{event.location}</ul>
                                            <ul><b>Host: </b>{event.host}</ul>      
                                            <ul><b>Date: </b>{event.date}, {event.time}</ul>          
                                        </Card.Body>
                                    </Card><br/>
                                </div>
                            )
                        })}
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

