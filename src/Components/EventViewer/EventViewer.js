import React from "react";
import { useLocation } from "react-router-dom";
import '../../styles/eventViewerStyle.css';
import NavBar from '../NavBar';
import SaveEvent from "./SaveEvent";
import useGetEvent from '../../hooks/useGetEvent';
import { loadingIcon } from '../../util/imgPicker'
import { useAuth } from '../../Context/AuthContext';
import {  useUserImagesContext } from "../../Context/UserDataContext";

export default function EventViewer(){
    let location = useLocation();  
    const { loading } = useAuth()

    const search = location.search
    const match = search.match(/event=(([^&]+))/);
    const param = match?.[1]
    const result = useGetEvent(param);
    const events = result.events

    const {images} = useUserImagesContext();
    const { arrayBufferToBase64 } = images;
    const imgStr=[];
    const eventImage = []
    for (var i = 0; i<events?.img.length; i++){
         imgStr.push(arrayBufferToBase64(events?.img[i].data.data))
         eventImage.push(`data:${events?.img?.contentType};base64,`+ imgStr[i] ) 
    }
    
    return(
        <>

        {loading
            ?

                <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
            :
                <>
                    <NavBar/>

                    {result.status!=='received'
                    ?
                        <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
                    :
                    
                        <div className = 'event-container'>

                            <strong className='groupname'> {events?.groupName}</strong>

                            <hr/>

                            <div className = 'event-save'></div>

                            <SaveEvent event={events} />
                            
                            <div className = 'event-content'>
                                
                                <div className = 'event-pic'>
                                    {eventImage.map((img, index) => {
                                        return(
                                            <ul key = {index}>
                                                <img src={img} className="rounded-circle" alt="default" style={{width: '120px', height: '120px'}}/>
                                            </ul>
                                        )
                                    })}
                                </div>

                                <h5>Details</h5>
                                {events?.description}
                                <br/><br/>

                                <h5>Interest</h5>
                                {events?.interest}
                                <br/><br/>

                                <b>Date: </b>
                                {events?.date}, {events?.time} 
                                <br/>

                                <b>Location: </b>
                                {events?.location}
                                <br/>

                                <b>Host: </b>
                                {events?.host}
                                <br/>

                            </div>
                            <hr/>
                        </div>
                        

                    }  
                </>
        }          
        </>
    )




}