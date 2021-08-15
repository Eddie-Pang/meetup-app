import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
<<<<<<< HEAD


=======
import {isOwned} from '../../services/userService'
import thumbnail from '../../image/thumbnail.png'
>>>>>>> eb4d074a0cabf0e52117972e54d1b6af6f53838d
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/carouselStyle.css'



export default function UpcomingEvents(props){
    const {events, history, method, upcomingEvents, handleRenderEventViewer} = props;
    console.log(upcomingEvents)
    console.log(events)
    

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
                                <img src={event?.img? event?.img : thumbnail} className="rounded" alt="default"  width="150" height="150" style={{margin: 'auto'}}/><br/>
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