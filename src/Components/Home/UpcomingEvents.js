import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom'
import thumbnail from '../../image/thumbnail.png'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/carouselStyle.css'
import { useUserImagesContext, useUserEventsContext } from '../../Context/UserDataContext';
import useGetUpcomingEvents from '../../hooks/useGetUpcomingEvents'


export default function UpcomingEvents(props){
    const {upcomingEvents} = useGetUpcomingEvents();
    const {events} = useUserEventsContext();
    const {history, method, handleRenderEventViewer} = props;
    // console.log(events)
    const {images} = useUserImagesContext()
    const {arrayBufferToBase64} = images;

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
             <ul><Link style={{'float':'right'}} to={'/upcomingEvents'}>See All</Link></ul>
             <br/>
            <Slider {...config}>
                {upcomingEvents?.map((event, index) => {
                    return( 
                        <div key={index} className="img-card" onClick = {()=>handleRenderEventViewer(event, events, method, history)} >
                            <div className="card-body" style={{textAlign: 'center', justifyContent: 'center'}}>
                                {/* <span className="badge badge-primary">{isOwned(event, currentUser)}</span> */}
                                <img src={event?.img[0]? `data:${event?.img?.contentType};base64,`+ arrayBufferToBase64(event?.img[0]?.data?.data)  : thumbnail} className="rounded" alt="default"  width="150" height="150" style={{margin: 'auto'}}/><br/>
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




// <Slider {...config}>
// {upcomingEvents?.map((event, index) => {
//     return( 
//         <div key={index} className="img-card" onClick = {()=>handleRenderEventViewer(event?.upcomingEvents, events, method, history)} >
//             <div className="card-body" style={{textAlign: 'center', justifyContent: 'center'}}>
//                 {/* <span className="badge badge-primary">{isOwned(event, currentUser)}</span> */}
//                 <img src={event?.binary? `data:${event?.contentType};base64,`+ arrayBufferToBase64(event?.binary?.data)  : thumbnail} className="rounded" alt="default"  width="150" height="150" style={{margin: 'auto'}}/><br/>
//                 <div className="card-title" style={{color: '#ffb3b3'}}>{event?.upcomingEvents?.groupName}</div>
//                 <div className="card-text">{event?.upcomingEvents?.date}&nbsp;{event?.upcomingEvents.time}</div>
//             </div>
//         </div>
//     )
// })}
// </Slider>