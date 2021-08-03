import React, { useRef } from 'react';
import CenteredContainer from './CenteredContainer';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import NavBar from './NavBar';
import {createEvent} from '../services/userService'


export default function CreateGroups(){
    const groupNameRef = useRef()
    const descriptionRef = useRef()
    const locationRef = useRef()
    const interestRef = useRef()
    const datetimeRef = useRef()
    const { currentUser } = useAuth()

    async function handleOnSubmit(e){
        e.preventDefault()
        let date = datetimeRef.current.value.substring(0,10)
        let time = datetimeRef.current.value.substring(11)
       
        try {
            const event ={
                groupName: groupNameRef.current.value,
                description: descriptionRef.current.value,
                location: locationRef.current.value,
                interest: interestRef.current.value,
                host: currentUser.name,
                date: date,
                time: time
            }
            await createEvent(event)
            console.log('create an event successfully')
        }catch(err){
            console.log(err)
        }

    }
    return(
        <>
        <NavBar/>
        <CenteredContainer>
        <h2 className="text-center mb-4">Set Up A New Group</h2>
        <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="group-name">
                <Form.Label>Group name: </Form.Label>
                    <Form.Control type="text" name="group-name" ref={groupNameRef} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description: </Form.Label>
                    <Form.Control as="textarea" ref={descriptionRef} rows={5} name="description" placeholder="Who should join, and why? What will you do?.." aria-describedby="passwordHelpBlock" minLength="20" required/>
                    <Form.Text id="passwordHelpBlock" muted>Your description must be at least 20 characters long.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location: </Form.Label>
                    <Form.Control type="text" name="location" ref={locationRef} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="interest">
                <Form.Label>Interest: </Form.Label>
                    <Form.Control type="text" name="interest" placeholder="make new friends.." ref={interestRef} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="interest">
                <Form.Label>Date and time: </Form.Label>
                    <Form.Control type="datetime-local" name="datetime" ref={datetimeRef} required/>
            </Form.Group>
            
            <Button variant="danger" type="submit">Submit</Button>
           
        </Form>
        </CenteredContainer>
        </>
    )
}