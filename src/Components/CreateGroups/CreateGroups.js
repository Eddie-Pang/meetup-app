import React, { useRef, useState } from 'react';
import CenteredContainer from '../CenteredContainer';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import NavBar from '../NavBar';
import {createEvent, updateEventImg, uploadFormData} from '../../services/userService'
import { loadingIcon } from '../../util/imgPicker'
import PopUp from '../Profile/PopUp'
import { useUserEventsContext, useUserImagesContext } from "../../Context/UserDataContext";


export default function CreateGroups(){
    const groupNameRef = useRef()
    const descriptionRef = useRef()
    const locationRef = useRef()
    const interestRef = useRef()
    const datetimeRef = useRef()
    const { currentUser, loading } = useAuth()

    const {events} = useUserEventsContext();
    const {images} = useUserImagesContext();
    const {handleShow, handleClose, photo, setPhoto, show, setShow, arrayBufferToBase64 } = images;
    const entry = "create"

   
    const [formData, setFormData] = useState();
    const [imgObjects, setImgObjects] = useState();


    const imgStr = arrayBufferToBase64(events?.img?.data?.data)
    console.log(photo)
    const eventImage = (`data:${events?.img?.contentType};base64,`+ imgStr ) 
    
   

    const handleUpload = async(e) => {
        e.preventDefault()
        if (photo && photo.length > 0){
            let formData = new FormData()
            let imgObjects = [];
            
            for (var i = 0; i<photo.length; i++){
               
                let imgObject = {
                    photos:photo[i].file,
                    url:URL.createObjectURL(photo[i].file)
                }
                imgObjects.push(imgObject)
                
                formData.append('photo[]', photo[i].file)
                formData.append('eventId[]', events?.events[0]?._id)
            }
            // console.log(photo[0])
            setFormData(formData);

            setImgObjects(imgObjects);
         
            setPhoto()
            handleClose();
        }
    }
    console.log(eventImage)

    async function handleOnSubmit(e){
        
        e.preventDefault()
        let date = datetimeRef.current.value.substring(0,10)
        let time = datetimeRef.current.value.substring(11)
        console.log(formData.getAll("photo[]"))
       
        try {
            let res = await uploadFormData(formData);
            let img = res.data;
            console.log(typeof(img))
            const event ={
                groupName: groupNameRef.current.value,
                description: descriptionRef.current.value,
                location: locationRef.current.value,
                interest: interestRef.current.value,
                host: currentUser.name,
                date: date,
                time: time,
                img: img
                
            }
            console.log(event)
            // await createEvent(event)
            console.log('create an event successfully')
        }catch(err){
            console.log(err)
        }

    }
    return(
        <>
            {loading
            ?
                <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
            :
                <>
                <NavBar/>

                <CenteredContainer>
                <h2 className="text-center mb-4">Set Up A New Group</h2>
                <Button variant="link" onClick={handleShow}>Upload Pictures</Button>
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

                    {imgObjects
                    ?
                        <>
                            {imgObjects.map((img, index)=>{
                                return(
                                    <ul key = {index}>
                                        <img src={img.url} className="rounded-circle" alt="default" style={{width: '40px', height: '40px'}}/>
                                        {img.photos?.name}
                                    </ul>
                                )}
                            )}</>
                    :   
                        <></>
                    }
                  
                    
                
                </Form>
                </CenteredContainer>
                <PopUp handleClose= {handleClose} show = {show} handleUpload={handleUpload} photo={photo} setPhoto={setPhoto} entry = {entry}/>
                </>
            }    
        </>
    )
}