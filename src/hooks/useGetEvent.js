
import React, { useEffect, useState } from "react";
import { getEvent, getImg } from "../services/userService";

//rsf tab

function useGetEvents(props) {
    const [status, setStatus]=useState('init');
    const [events, setEvents] = useState();
    const [imgs, setImgs] = useState();
    
  
    const param = props
    
    useEffect (() =>{
        let isMounted = true;
        async function requestUserEvents(){

            try{
                setStatus('requesting');
    
                if (isMounted){
                    const events = await getEvent(param)
                    const imgs = await getImg(events.data._id);
                    // console.log(imgs.data)
                    console.log(events.data)
                    setEvents(events.data);
                    setImgs(imgs.data)
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
        imgs
    

    }
    
    
}

export default useGetEvents;