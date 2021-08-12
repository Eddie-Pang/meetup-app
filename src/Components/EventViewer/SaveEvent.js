import React from "react";

import {useUserEventsContext } from '../../Context/UserDataContext';
import {saveIcon, unsaveIcon} from '../../util/imgPicker';
import '../../styles/eventViewerStyle.css';
import {useAuth} from '../../Context/AuthContext'

export default function SaveEvent(props){

    const {event} = props;
    const {events} = useUserEventsContext();
    const {currentUser} = useAuth();
    console.log(events.attendees)
    
    
   
    const renderSaveBtn = () => {
      
        const save = !events.attendees?.some(i => i===currentUser?._id);
        
        return ( 
            <div>

                <div className="icon">

                    <div id = "toogle-save" className = 'rnd-btn' onClick = {()=>{save ? events.save(event) :  events.unsave(event)}}>{save? saveIcon():unsaveIcon()}</div>
                        
                </div>
                
                <div className='caption'>{save ? 'join':'cancel'}</div>

            </div>
          
        ) 
    }

    return renderSaveBtn();

}