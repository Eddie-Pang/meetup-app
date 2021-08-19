import React from 'react';
import useGetUpcomingEvents from '../../hooks/useGetUpcomingEvents'
import CardField from '../CardField';

export default function SeeAllUpcomingEvents(props){
    const {upcomingEvents, status} = useGetUpcomingEvents();
    const method = 'upcoming-all'
    
    
    
    return(
        
        <CardField eventList={upcomingEvents} status = {status} method = {method}/>
        
    )
}    

