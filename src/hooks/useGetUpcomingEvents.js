
import React, { useEffect, useState } from "react";
import { getUpcomingEvents } from "../services/userService";

//rsf tab

function useGetUpcomingEvents() {
    const [status, setStatus]=useState('init');
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    
    
    useEffect (() =>{
        let isMounted = true;
        async function fetchEvents(){
            try{
                setStatus('requesting');
    
                if (isMounted){
                    let events = await getUpcomingEvents()
                    setUpcomingEvents(events.data);
                    console.log(events.data)
        
                    setStatus('received');
                 
                }  
            }catch(error){
            
                setStatus('error');
            }
        }
        fetchEvents();
        return()=>{
            setStatus('idle');
            isMounted=false;
        }
    },[]);
    return {
        status, 
        upcomingEvents,
   
    }
    
    
}

export default useGetUpcomingEvents;