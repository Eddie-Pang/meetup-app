import React, { useEffect, useState } from 'react';
import { getUpcomingEvents } from '../services/userService';


export default function UpcomingEvents(){
    const [events, setEvents] = useState([])

    useEffect(()=>{
        async function fetchEvents(){
            await getUpcomingEvents()
            .then(res => {
                console.log(res.data)
                setEvents(res.data)
            })
        }
        fetchEvents()
    }, [])

    return(
        <div style={{marginTop: '70px', marginLeft: '80px'}}>
        <h3>Upcoming Events</h3>
        <div id="myCarousel" className="carousel" data-ride="carousel">
        {/* Wrapper for slides */}
        <div className="carousel-inner">
            <div className="item" >
                <ul className="list-group list-group-horizontal">
                    {events.map((value, index) => {
                        return (
                        <li className="list-group-item" key={index}>
                            <h5 style={{color: 'grey'}}>{value.groupName}</h5>
                            <h5>{value.date}</h5>
                            {value.host}
                            
                            
                        </li>
                        )
                    })}
                    {/* <li className="list-group-item">1</li>*/}
                    
                </ul>

                    </div>
                
        
            

            {/* <div className="item">
                <img src="chicago.jpg" alt="Chicago" />
            </div>

            <div className="item">
                <img src="ny.jpg" alt="New York" />
            </div> */}
        </div>

        {/* Left and right controls */}
        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
        </a>
        </div>

        </div>
    )
}