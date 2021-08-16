import React, { Component } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import NavBar from '../NavBar';
import SearchArea from '../Search/SearchArea';
import useGetFindEvents from '../../hooks/useGetFindEvents';
import { loadingIcon } from '../../util/imgPicker'

export default function EventFinder(props){
    const {location} = props
  
    const match = location.search.match(/category=(([^&]+))/);
    var param = match?.[1].replaceAll('%20', ' ')

    console.log(param)
   
    const {events, status} = useGetFindEvents(param)
   

    
    // const events = location.data
    console.log(events)

    return(
        <>
         
            {status==='received'
            ?
                <>
                    <NavBar/>
                    <br/>
                    <div className="d-flex flex-column align-items-center justify-content-center" >
                        <div className="w-100" style={{ maxWidth: "500px" }}>
                            <SearchArea/><br/>
                            <h5 style={{color: '#006699'}}>Events</h5><br/><br/>
                            <ul className="list-group list-group-flush">
                                {events?.map((value, index) => {
                                    return (
                                        <li className="list-group-item" key={index}>
                                            <h6 style={{color: '#ffcccc'}}>{value.date}@{value.time}</h6>
                                            <h6>{value.groupName}</h6>
                                            <p>{value.location}</p>
                                            <p>{value.attendee?.length}</p>
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>
                    </div>
                    
                    {/* <h5 style={{color: '#006699'}}>Events</h5>
                    {events.map((value, index) => {
                        return (<div key={index}>
                            <p>{value.groupName}</p>
                        </div>)
                    })}
                    */}
                </>
            :   
                <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
            }    

        </>
    )
}