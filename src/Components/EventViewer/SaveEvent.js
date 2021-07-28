import React from "react";

import {useUserEventsContext } from '../../Context/UserDataContext';
import {saveIcon, unsaveIcon} from '../../util/imgPicker';
import '../../styles/eventViewerStyle.css';

export default function SaveEvent(props){

    const {event} = props;
    const {events} = useUserEventsContext();
    // console.log(event)
    // console.log(events)

    const renderSaveBtn = () => {
      
        const save = !events.events?.some(i => i?._id===event?._id);
        
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