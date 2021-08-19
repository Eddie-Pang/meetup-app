import React from 'react';
import { handleRenderEventViewer } from '../util/functionStore';
import { useHistory } from 'react-router-dom';
import { useUserEventsContext } from '../Context/UserDataContext';
import {isOwned} from '../util/functionStore'
import NavBar from './NavBar';
import { Card } from 'react-bootstrap';
import { loadingIcon } from '../util/imgPicker'
import '../styles/resultStyle.css';
import {useAuth} from '../Context/AuthContext'


export default function CardField(props){ 

const {events} = useUserEventsContext();
const {eventList, status, method} = props
const { currentUser, updateData } = useAuth()
const history = useHistory()

function renderEventViewer(event, events, method, history){
    updateData(event?._id)
    handleRenderEventViewer(event, events, method, history)
}

    return(
            <>
                {status==='received'
                ?
                    <>
                        <NavBar/>
                        
                        <div className = 'results'>
                    
                            <br/>
                        
                                    {eventList?.map((event, index) => {
                                        return(
                                            <div key = {index}>
                                            <Card className = 'result-card' key = {index} type="submit" 
                                                style={isOwned(event, currentUser)?{borderColor:'blue'}:null}
                                                onClick = {()=>renderEventViewer(event, events, method, history)}
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



} 