import React from 'react';
import useGetSimilarEvents from '../../hooks/useGetSimilarEvents';
import { BsGeoAlt } from "react-icons/bs";
import { Link, useHistory } from 'react-router-dom'
import { useUserEventsContext } from '../../Context/UserDataContext';
import {handleRenderEventViewer} from '../../util/functionStore'
import {useAuth} from '../../Context/AuthContext'


export default function SimilarEvents(props){
    const { param } = props
    console.log(props)
    const history = useHistory()
    const { events } = useUserEventsContext()
    const method = 'my-event'
    const {updateData} = useAuth();
     

    // const result = useGetSimilarEvents(param)
    const  { similarEvents } = useGetSimilarEvents(param)
    console.log(similarEvents)
    const eventArr = similarEvents.length >= 4 ? similarEvents.slice(4) : similarEvents

    function renderEventViewer(value, events, method, history){
        updateData(value._id)
        handleRenderEventViewer(value, events, method, history)
    }

    return(
        <>
        <div className='row' style={{width:'800px'}}>
            <div className="col"><h5 style={{color: '#33cccc', textAlign:'left'}}>Similar Events Nearby</h5></div>
        
            <div className='col'><Link style={{float:'right'}} to={`/similarEvents/?&event=${param}`}>See All</Link></div>
        
        </div><br/>
        <ul className="list-group list-group-horizontal">
        {eventArr.map((value, index) => {
            return(
                <li className="list-group-item" key={index} onClick={() => renderEventViewer(value, events, method, history) } style={{marginRight: '50px',border: 'none', width: '250px',backgroundColor: 'ghostwhite'}}>
                    <h5 style={{color: '#29a3a3'}}>{value.date},{value.time}</h5>
                    <p>{value._id}</p>
                    <p><strong>{value.groupName}</strong></p>
                    <p><BsGeoAlt/>{value.location}</p>
                    <p className="text-muted">Attendees: {value.attendees? value.attendees.length : 0 }</p>
                </li>
            )
        })}
        </ul>
        
        </>
    )
}