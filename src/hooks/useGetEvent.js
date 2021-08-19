
import React, { useEffect, useState } from "react";
import { getEvent } from "../services/userService";
import {useAuth} from '../Context/AuthContext'

//rsf tab

function useGetEvents(props) {
    const [status, setStatus]=useState('init');
    const [events, setEvents] = useState();
    const {update} = useAuth();

    const param = props
    
    useEffect (() =>{
        let isMounted = true;
        async function requestUserEvents(){

            try{
                setStatus('requesting');
    
                if (isMounted){
                    if (!param){
                        setStatus('idle')
                        isMounted=false
                        return
                    }
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
    },[update]);
    return {
        status, 
        events,
    }
    
    
}

export default useGetEvents;