import React from "react";
import { Card } from 'react-bootstrap';
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import '../../styles/myEventStyle.css'
import '../../styles/resultStyle.css'
import {deleteEvent} from '../../services/userService'
import { useAuth } from "../../Context/AuthContext";



export default function MyHostedEventsView(props){

    const {handleRenderEventViewer, history, events, method, hostedEvents} = props;
   
    console.log(hostedEvents)
    const {updateData} = useAuth()

    async function handleEdit(e){
        console.log('edit: ', e.target.id)
        e.stopPropagation();
        history.push(`/newGroup/?&event=${e.target.id}`)
    }

    async function handleDelete(e){
        console.log('del: ', e.target.id)
        e.stopPropagation();
        await deleteEvent(e.target.id)
        
        await updateData(e.target.id);
    }
  
    return(
        <>
            {hostedEvents?.map((event, index) => { 
                return(
                    <div key = {index}>
                        <Card className = 'result-card' key = {index} >
                            <Card.Body key = {index} type="submit" onClick = {()=>handleRenderEventViewer(event, events, method, history)}>
                                <div className = 'caption' >hosted</div>
                                <ul><Card.Title>{event.groupName}</Card.Title></ul>
                                <ul><Card.Text>{event.description}</Card.Text></ul>
                                <ul><b>Location: </b>{event.location}</ul>
                                <ul><b>Host: </b>{event.host.name}</ul>      
                                <ul><b>Date: </b>{event.date}, {event.time}</ul>    
                                <ul className='caption'>
                                    <button type = 'button' className="eventCard-button" id = {event._id} onClick ={handleEdit}>{BsPencilSquare()}</button> <>&nbsp;</>
                                    <button type = 'button' className="eventCard-button" id = {event._id} onClick ={handleDelete}><BsFillTrashFill/></button> 
                                </ul>
                            </Card.Body>       
                        </Card><br/>
                    </div>
                )
            })}
        </>
    )
}