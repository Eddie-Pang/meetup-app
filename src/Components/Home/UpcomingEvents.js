import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

import thumbnail from '../../image/thumbnail.png'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/carouselStyle.css'
import {getFirstImg} from '../../services/userService'
import { useUserImagesContext } from '../../Context/UserDataContext';



export default function UpcomingEvents(props){
    const {events, history, method, upcomingEvents, handleRenderEventViewer} = props;
    console.log(upcomingEvents)
    console.log(events)
    const {images} = useUserImagesContext()
    const {arrayBufferToBase64} = images;

    // const getPic = async(id)=>{
    //     // console.log(id)
    //     let pic = await getFirstImg(id)
    //     if(!pic.data.data){
    //         return
    //     }
    //     let pics = pic.data.data
    //     let imgStr = arrayBufferToBase64(pics.data)
    //     const eventImage = (`data:${pic.data.contentType};base64,`+ imgStr ) 


    //     return eventImage
    // }
   
    

    const config = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
        
    };
   

    return(
        <div style={{'width':'90%', 'margin':'auto', 'paddingTop':'2rem'}}>
             <h4>Upcoming Events</h4>
             <ul><a style={{'float':'right'}} href={'/upcomingEvents'}>See All</a></ul>
             <br/>
            <Slider {...config}>
                {upcomingEvents?.map((event, index) => {
                    return( 
                        <div key={index} className="img-card" onClick = {()=>handleRenderEventViewer(event, events, method, history)} >
                            <div className="card-body" style={{textAlign: 'center', justifyContent: 'center'}}>
                                {/* <span className="badge badge-primary">{isOwned(event, currentUser)}</span> */}
                                {/* <img src={getPic(event._id)? getPic(event._id) : thumbnail} className="rounded" alt="default"  width="150" height="150" style={{margin: 'auto'}}/><br/> */}
                                <img src={event?.img? event?.img[0] : thumbnail} className="rounded" alt="default"  width="150" height="150" style={{margin: 'auto'}}/><br/>
                                <div className="card-title" style={{color: '#ffb3b3'}}>{event?.groupName}</div>
                                <div className="card-text">{event?.date}&nbsp;{event?.time}</div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
       
            
       
        
        
                
        
            

            

        
    )
}