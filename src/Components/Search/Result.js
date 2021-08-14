import React from 'react';
import { Card, Button } from 'react-bootstrap';
import SearchArea from './SearchArea';
import { useLocation, useHistory } from "react-router-dom";
import '../../styles/resultStyle.css';
import NavBar from '../NavBar';
import { useAuth } from '../../Context/AuthContext';
import { loadingIcon } from '../../util/imgPicker'
import {useUserEventsContext } from '../../Context/UserDataContext';
import {handleRenderEventViewer} from '../../services/userService'
import {isOwned} from '../../services/userService'

export default function Result(){
    let location = useLocation();  
    let history = useHistory();
    const {loading, currentUser} = useAuth();
    const {events} = useUserEventsContext();
    const results = location.data
    const method = 'search'
    

    return(
        <>
            <NavBar/>
            
            <div className = 'results'>
            
                <SearchArea/>
                <br/>
                {loading
                ?
                    <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
                :
                    <>
                        {results?.map((event, index) => {
                            return(
                                <div key = {index}>
                                <Card className = 'result-card' style={isOwned(event, currentUser)?joinedStyle:null} key = {index} type="submit" onClick = {()=>handleRenderEventViewer(event, events, method, history)}>
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
                    </>        
                }            
            </div>
        </>

    )

}


const joinedStyle = {
    borderColor:'blue'
}

