import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CenteredContainer from '../CenteredContainer'
import SearchArea from './SearchArea';
import { Link, useLocation, useHistory } from "react-router-dom";
import '../../styles/resultStyle.css';
import NavBar from '../NavBar';

export default function Result(){
    let location = useLocation();  
    let history = useHistory();

    const events = location.data

    function handleClick(event){
        history.push({  
            pathname : '/event-viewer',
            data: event
        })
    }

    return(
        <>
        <NavBar/>
        
        <div className = 'results'>
        
        <SearchArea/>
        <br/>
            {events?.map((event, index) => {
                return(
                    <div key = {index}>
                    <Card className = 'result-card' key = {index} type="submit" onClick = {()=>handleClick(event)}>
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
            

        </div></>

    )

}

