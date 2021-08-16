
import React, { useEffect, useState } from "react";
import { getEvent } from "../services/userService";

//rsf tab

function useGetEvents(props) {
    const [status, setStatus]=useState('init');
    const [events, setEvents] = useState();
    
  
    const param = props
    
    useEffect (() =>{
        let isMounted = true;
        async function requestUserEvents(){

            try{
                setStatus('requesting');
    
                if (isMounted){
                    const events = await getEvent(param)
                  
                    console.log(events.data)
                    setEvents(events.data);
              
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
    },[]);
    return {
        status, 
        events,
    }
    
    
}

export default useGetEvents;