
import React, { useEffect, useState } from "react";
import { getJoinedEvents } from "../services/userService";
// import { useAuth } from '../Context/AuthContext';

//rsf tab

function useGetJoinedEvents(props) {
    const [status, setStatus]=useState('init');
    const [joinedEvents, setJoinedEvents] = useState();
    // const {currentUser} = useAuth()
   
  
    const param = props
    console.log(param)
    
    useEffect (() =>{
        let isMounted = true; 
        async function requestUserEvents(){

            try{
                setStatus('requesting');
    
                if (isMounted){
                    const events = await getJoinedEvents(param) 
                    setJoinedEvents(events.data);
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
        joinedEvents,
    }
    
    
}

export default useGetJoinedEvents;