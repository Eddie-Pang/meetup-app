import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import {isOwned} from '../../services/userService'

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/carouselStyle.css'



export default function UpcomingEvents(props){
    const {currentUser, events, history, method, upcomingEvents, handleRenderEventViewer} = props;

    const config = {
        dots: true,
        infinite: true,
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
                {upcomingEvents.map((event, index) => {
                    return( 
                        <div key={index} className="img-card" onClick = {()=>handleRenderEventViewer(event, events, method, history)} >
                            <div className="card-body">
                                {/* <span className="badge badge-primary">{isOwned(event, currentUser)}</span> */}
                                <div className="card-title">{event?.groupName}</div>
                                <div className="card-text">{event?.time}</div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
       
            
       
        
        
                
        
            

            

        
    )
}