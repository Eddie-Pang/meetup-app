import React, { Component } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import NavBar from '../NavBar';
import SearchArea from '../Search/SearchArea';

export default function EventFinder(){
    const location = useLocation()
    const events = location.data
    console.log(events)

    return(
        <>
        <NavBar/>
        <br/>
        <div className="d-flex flex-column align-items-center justify-content-center" >
            <div className="w-100" style={{ maxWidth: "500px" }}>
                <SearchArea/><br/>
                <h5 style={{color: '#006699'}}>Events</h5><br/><br/>
                <ul className="list-group list-group-flush">
                    {events.map((value, index) => {
                        return (
                            <li className="list-group-item" key={index}>
                                {value.date}@{value.time}
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
    )
}