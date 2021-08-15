import React, { Component } from 'react';
import { useLocation, useHistory } from "react-router-dom";

export default function EventFinder(){
    const location = useLocation()
    const events = location.data
    console.log(events)

    return(
        <>
        <h5>Result</h5>
        {events.map((value, index) => {
            return (<div key={index}>
                <p>{value.groupName}</p>
            </div>)
        })}
        </>
    )
}