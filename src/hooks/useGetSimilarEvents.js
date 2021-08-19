import React, { useEffect, useState } from "react";
import { getSimilarEvents } from "../services/userService";
import {useAuth} from '../Context/AuthContext'

//rsf tab

function useGetSimilarEvents(params) {
    const [status, setStatus]=useState('init');
    const [similarEvents, setSimilarEvents] = useState([]);
    console.log('hook:', params)
    const {update} = useAuth()
    // const params = props 

    useEffect (() =>{
        let isMounted = true;
        async function fetchEvents(){
            try{
                setStatus('requesting');
    
                if (isMounted){
                    let events = await getSimilarEvents(params)
                    setSimilarEvents(events.data);
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
    },[update]);
    return {
        status, 
        similarEvents,
   
    }
    
    
}

export default useGetSimilarEvents;