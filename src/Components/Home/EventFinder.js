import React, { Component } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import NavBar from '../NavBar';
import SearchArea from '../Search/SearchArea';
import useGetFindEvents from '../../hooks/useGetFindEvents';
import { loadingIcon } from '../../util/imgPicker'
import thumbnail from '../../image/thumbnail.png'
import { useUserImagesContext } from '../../Context/UserDataContext';

export default function EventFinder(props){
    const {location} = props
  
    const match = location.search.match(/category=(([^&]+))/);
    var param = match?.[1].replaceAll('%20', ' ')

    console.log(param)
   
    const {events, status} = useGetFindEvents(param)
    const {images} = useUserImagesContext()
    const {arrayBufferToBase64} = images
   

    
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
                            <h5 style={{color: '#006699'}}>Events</h5><br/><hr/><br/>
                            <ul className="list-group list-group-flush">
                                {events?.map((value, index) => {
                                    return (
                                        <li className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col">
                                                    <h5 style={{color: '#ffcccc'}}>{value.date}@{value.time}</h5>
                                                    <h5>{value.groupName}</h5>
                                                    <p className="text-muted">{value.location}</p>
                                                    <p className="text-muted">attendee: {value.attendee? value.attendee.length : 0}</p>
                                                </div>  
                                                <div className="col">
                                                    <img src={value.img? `data:${value.img[0].contentType};base64,`+ arrayBufferToBase64(value.img[0].data.data)  : thumbnail} className="rounded" alt="default"  width="150" height="150"/>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>
                    </div>
                    
                   
                </>
            :   
                <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
            }    

        </>
    )
}