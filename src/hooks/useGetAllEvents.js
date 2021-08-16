
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../services/userService";

import {useAuth} from '../Context/AuthContext'

//rsf tab

function useGetAllEvents(props) {
    const [status, setStatus]=useState('init');
    const [joinedEvents, setJoinedEvents] = useState();
    const [hostedEvents, setHostedEvents] = useState();
 
    const {update} = useAuth();
    const param = props
    
    useEffect (() =>{
        let isMounted = true; 
        async function requestUserEvents(){

            try{
                setStatus('requesting');
    
                if (isMounted){
                    const events = await getAllEvents(param) 
                    console.log(events)
                    setJoinedEvents(events.data.joinedEvents);
                    setHostedEvents(events.data.hostedEvents)
                    setStatus('received');
                }  
            }catch(error){
                setStatus('error');
            }
        }
       requestUserEvents();
        return()=>{
            setStatus('idle');
            isMounted=false;
        }
    },[update]);
    return {
        status, 
        joinedEvents,
        hostedEvents,
    }
    
    
}

export default useGetAllEvents;