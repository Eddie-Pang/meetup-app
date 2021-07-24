import React from "react";
import { useLocation } from "react-router-dom";
import '../../styles/eventViewerStyle.css';
import NavBar from '../NavBar';

export default function EventViewer(){
    let location = useLocation();  
    const events = location.data
  
    return(
        <><NavBar/>
        <div className = 'event-container'>

            <strong className='groupname'> {events.groupName}</strong>

            <hr/>
            
            <div className = 'event-content'>

                <h5>Details</h5>
                {events.description}
                <br/><br/>

                <h5>Interest</h5>
                {events.interest}
                <br/><br/>

                <b>Date: </b>
                {events.date}, {events.time} 
                <br/>

                <b>Location: </b>
                {events.location}
                <br/>

                <b>Host: </b>
                {events.host}
                <br/>

            </div>

            <hr/>

        </div>
        </>
    )




}