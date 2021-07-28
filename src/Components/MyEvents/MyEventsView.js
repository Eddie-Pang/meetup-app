import React from "react";
import NavBar from "../NavBar";
import { useUserEventsContext } from "../../Context/UserDataContext";
import { Card, Button } from 'react-bootstrap';

export default function MyEventsView(props){

    const {events} = useUserEventsContext();
    const myEvents = events.events
    // console.log(events.events)
    const {handleViewEvent} = props;

    return(
        <>
        <NavBar/>

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
    )
}

