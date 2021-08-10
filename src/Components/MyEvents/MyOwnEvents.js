import React from "react";
import NavBar from "../NavBar";
import { useUserEventsContext } from "../../Context/UserDataContext";
import { Card, Button } from 'react-bootstrap';
import { loadingIcon } from '../../util/imgPicker'
import { useAuth } from '../../Context/AuthContext';

export default function MyOwnEventsView(props){

    const {currentUser} = useAuth();
    const events = currentUser?.ownEvents;
    console.log(events)
  
    
    const {handleViewEvent} = props;

    return(
        <>
            
            {events?.map((event, index) => { 
                return(
                    <div key = {index}>
                        <Card className = 'result-card' key = {index} type="submit" onClick = {()=>handleViewEvent(event)}>
                            <Card.Body key = {index}>
                                <div className = 'caption'>hosted</div>
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