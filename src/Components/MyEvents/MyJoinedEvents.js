import React from "react";
import { Card, Button } from 'react-bootstrap';


export default function MyJoinedEvents(props){

    const {events, handleViewEvent} = props;
    
    return(
        <>
            {events?.map((event, index) => { 
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
