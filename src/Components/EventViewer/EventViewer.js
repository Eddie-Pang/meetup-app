import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import '../../styles/eventViewerStyle.css';
import NavBar from '../NavBar';
import SaveEvent from "./SaveEvent";
import useGetEvent from '../../hooks/useGetEvent';
import { loadingIcon } from '../../util/imgPicker'
import { useAuth } from '../../Context/AuthContext';
import {  useUserImagesContext } from "../../Context/UserDataContext";
import {deleteEvent} from '../../services/userService'
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";


export default function EventViewer(){
    let location = useLocation();  
    const { loading, currentUser, isAuth } = useAuth()
    const search = location.search
    const match = search.match(/event=(([^&]+))/);
    const methods = search.match(/method=(([^&]+))/);
    const param = match?.[1]
    const method = methods?.[1]
    const result = useGetEvent(param);
    const {events} = result
    console.log(isAuth)
    console.log(events?.img)
   
    const history = useHistory();
    
    const isHosted = events?.host?.id===currentUser?._id

    async function handleEdit(eventId){
        console.log('edit: ', eventId)
     

    }
    
    async function handleDelete(eventId){
    
        await deleteEvent(eventId)

        switch (method){
            case 'myEvent':
                return history.push('/myEvents')
            case 'search':
                return history.push('/result')   
            case 'upcoming':  
                return history.push('/')    
            case 'upcoming-all':  
                return history.push('/upcomingEvents')   

            default:
                return history.push('/')   
        }
    }
        
          
    
    const {images} = useUserImagesContext();
    const { arrayBufferToBase64 } = images;
    const imgStr=[];
    const eventImage = []
    if (events?.img){
        for (var i = 0; i<events?.img?.length; i++){  
            imgStr.push(arrayBufferToBase64(events?.img[i].data.data))
            eventImage.push(`data:${events?.img[i]?.contentType};base64,`+ imgStr[i] ) 
       }
    }
    // if (imgs){
    //     for (var i = 0; i<imgs?.img?.length; i++){  
    //         imgStr.push(arrayBufferToBase64(imgs?.img[i].data.data))
    //         eventImage.push(`data:${imgs?.img[i]?.contentType};base64,`+ imgStr[i] ) 
    //    }
    // }
    
    
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

                            {isAuth
                            ?
                                <>
                                    {isHosted
                                    ?
                                    <div className='caption'>
                                        <span className="badge badge-primary">Hosted</span><>&nbsp;</>
                                        <button type = 'button' className="eventCard-button"  onClick ={()=>handleEdit(events._id)}>{BsPencilSquare()}</button> <>&nbsp;</>
                                        <button type = 'button' className="eventCard-button"  onClick ={()=>handleDelete(events._id)}>{BsFillTrashFill()}</button> 
                                    </div>
                                    :
                                    <SaveEvent event={events} />
                                    }
                                </>
                            :
                                <></>
                            }
                            
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
                                {events?.host?.name}
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

