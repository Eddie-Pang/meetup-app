import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CenteredContainer from '../CenteredContainer'
import SearchArea from './SearchArea';
import { Link, useLocation } from "react-router-dom";


export default function Result(){
    let location = useLocation();  
    const events = location.data

    return(
        <CenteredContainer>
        <SearchArea/>
        <br/>
        {/* <div style= {{ margin: '0 auto', float: 'none', textAlign: 'center', justifyContent:'center', display: 'block'}}> */}

            {events?.map((event, index) => {
                return(
                    <Card >
                        <Card.Body key = {index}>
                            <ul><Card.Title>{event.groupName}</Card.Title></ul>
                            <ul><Card.Text>{event.description}</Card.Text></ul>
                            <ul><b>Location: </b>{event.location}</ul>
                            <ul><b>Host: </b>{event.host}</ul>                   
                        </Card.Body>
                    </Card>
                )
            })}

        {/* </div> */}

        </CenteredContainer>

    )

}