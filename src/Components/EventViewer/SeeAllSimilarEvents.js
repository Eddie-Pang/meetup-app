import React from 'react';
import useGetSimilarEvents from '../../hooks/useGetSimilarEvents'
import CardField from '../CardField';

export default function SeeAllSimilarEvents(props){
    const {location:{search}} = props
    const match = search.match(/event=(([^&]+))/);
    const param = match?.[1]
    
    const {similarEvents, status} = useGetSimilarEvents(param);
    console.log(similarEvents)
    const method = `similar-all&origin=${param}`
    
    
    
    return(
        
        <CardField eventList={similarEvents} status = {status} method = {method}/>
        
    )
}    
