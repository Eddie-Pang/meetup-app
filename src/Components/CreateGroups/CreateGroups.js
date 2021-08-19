import React, { useRef, useState } from 'react';
import CenteredContainer from '../CenteredContainer';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import { useCategory } from '../../Context/CategoryContext';
import NavBar from '../NavBar';
import {createEvent, uploadImg, editEvent} from '../../services/userService'
import { loadingIcon } from '../../util/imgPicker'
import PopUp from '../Profile/PopUp'
import { useUserImagesContext } from "../../Context/UserDataContext";
import { BsX } from "react-icons/bs";
import { useLocation, useHistory } from 'react-router-dom';
import useGetEvents from '../../hooks/useGetEvent';


export default function CreateGroups(){
    const groupNameRef = useRef()
    const descriptionRef = useRef()
    const locationRef = useRef()
    const interestRef = useRef()
    const datetimeRef = useRef()
    const { currentUser, loading } = useAuth()
    const { category } = useCategory()
    // console.log(category)

    const {images} = useUserImagesContext();
    const {arrayBufferToBase64} = images
    const {handleShow, handleClose, photo, setPhoto, show } = images;
    const entry = "create"
    const [imgObjects, setImgObjects] = useState();


    //update------------------------------
    const location = useLocation();
    const history = useHistory();
    const search = location.search;
    const match = search.match(/event=(([^&]+))/);
    const param = match?.[1] 
    const {events, status} = useGetEvents(param)

    const groupName = events?.groupName;
    const description = events?.description;
    const locate = events?.location;
    const [interest, setInterest] = useState();
    const date = events?.date+'T'+events?.time;

    const [loadings, setLoadings] = useState(false)

    const [firstGet, setFirstGet] = useState(true);
    const imgStr=[];
    const eventImage = [] 
    const eventImageObject = [] 
    const [newEventImages, setNewEventImages] = useState(); 
    const [newEventImageObjects, setNewEventImageObjects] = useState(); 
    
    if (events?.img){
        for (var i = 0; i<events?.img?.length; i++){  
            imgStr.push(arrayBufferToBase64(events?.img[i]?.data?.data))
            eventImage.push(`data:${events?.img[i]?.contentType};base64,`+ imgStr[i] ) 
            const img={
                binary:events?.img[i]?.data?.data,
                contentType:events?.img[i]?.contentType
            }
            eventImageObject.push(img)
       } 
    }
    
    //-------------------------------------------------------------------
   
    const handleUpload = async(e) => {
        e.preventDefault()
        if (photo && photo.length > 0){
            let imgObjects = [];   
            for (var i = 0; i<photo.length; i++){
                let imgObject = {
                    photos:photo[i].file,
                    url:URL.createObjectURL(photo[i].file)
                }
                console.log(imgObject)
                imgObjects.push(imgObject)
            }
            
            setImgObjects(imgObjects);
            setPhoto()
            handleClose();
        }
    }
   

    async function handleOnSubmit(e){
        e.preventDefault()
        let date = datetimeRef.current.value.substring(0,10)
        let time = datetimeRef.current.value.substring(11)
        setLoadings(true)

        try {
            const event ={
                groupName: groupNameRef.current.value,
                description: descriptionRef.current.value,
                location: locationRef.current.value,
                interest: interestRef.current.value,
                host: {
                    id:currentUser._id, 
                    name: currentUser.name
                },    
                date: date,
                time: time,
            }
            let res = await createEvent(event)
            if (imgObjects&&imgObjects.length>0){
                let formData = new FormData()
                for (var i = 0; i<imgObjects.length; i++){ 
                    formData.append('photo[]', imgObjects[i].photos)
                    formData.append('eventId[]', res.data?._id)
                }
                await uploadImg(formData)
            }
            setImgObjects();
            setLoadings(false)
            console.log('create an event successfully')
        }catch(err){
            console.log(err)
        }
    }

    async function handleEdit(e){
        e.preventDefault()
        console.log('edit')
        let date = datetimeRef.current.value.substring(0,10)
        let time = datetimeRef.current.value.substring(11)
        setLoadings(true)

        try {
            let imgs = newEventImageObjects?newEventImageObjects:eventImageObject
            
            const event ={
                groupName: groupNameRef.current.value,
                description: descriptionRef.current.value,
                location: locationRef.current.value,
                interest: interestRef.current.value,
                host: {
                    id:currentUser._id, 
                    name: currentUser.name
                },    
                date: date,
                time: time,
                imgs: imgs
                
            }
            let res = await editEvent(event, events?._id)
          
            if (imgObjects&&imgObjects.length>0){
                let formData = new FormData()
                for (var i = 0; i<imgObjects.length; i++){ 
                    formData.append('photo[]', imgObjects[i].photos)
                    formData.append('eventId[]', res.data?._id)
                }
                await uploadImg(formData)
            }
            
            setNewEventImages();
            setImgObjects();
            setLoadings(false)
            console.log('edit an event successfully')
            history.push(`/event-viewer/?&method=myEvent&&event=${events?._id}`)
        }catch(err){
            console.log(err)
        }
    }

    function handleDelete(id){
        console.log(id)
        console.log(imgObjects)
        let imgs = imgObjects.filter((img, index) =>{
            return index!==id
        })
        setImgObjects(imgs)
    }
    


    function handleDeleteEventImage(id){
        let eventImgs = newEventImages.filter((img, index) =>{
            return index!==id
        })
        let newEventImgObjects = newEventImageObjects.filter((img, index)=>{
            return index!==id
        })
        setNewEventImages(eventImgs)
        setNewEventImageObjects(newEventImgObjects)
        setFirstGet(false) 
    }

    function getPreviousImgs(){
        if (firstGet){
            setNewEventImages(eventImage)
            setNewEventImageObjects(eventImageObject)
        }else{
            setNewEventImages(newEventImages)
            setNewEventImageObjects(newEventImageObjects)
        }
        document.getElementById('show').style.display='none'
    }
    

    

    return(
        <>
            {loading||status==='requesting'||loadings
            ?
                <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
            :
                <>
                <NavBar/>

                <CenteredContainer>
                <h2 className="text-center mb-4">{events?"Update group's data":'Set Up A New Group'}</h2>
                
                <Form onSubmit={events?handleEdit:handleOnSubmit}>
                    <Form.Group className="mb-3" controlId="group-name">
                        <Form.Label>Group name: </Form.Label>
                            <Form.Control type="text" name="group-name" defaultValue = {events?groupName:''} ref= {groupNameRef}required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description: </Form.Label>
                            <Form.Control as="textarea" defaultValue = {events?description:''} ref={descriptionRef} rows={5} name="description" placeholder="Who should join, and why? What will you do?.." aria-describedby="passwordHelpBlock" minLength="20" required/>
                            <Form.Text id="passwordHelpBlock" muted>Your description must be at least 20 characters long.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="location">
                        <Form.Label>Location: </Form.Label>
                            <Form.Control type="text" name="location" defaultValue = {events?locate:''} ref={locationRef} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="interest">
                        <Form.Label >Interest: </Form.Label>
                            <Form.Control as="select" name="interest" onChange={() => setInterest(document.getElementById('interest').value)} value = {interest||events?.interest} placeholder="make new friends.." ref={interestRef} required>
                                <option>--Please select--</option>
                                {category.map((value, index) => {
                                    return(
                                        <option key={index}>{value}</option>
                                    )
                                })}
                            </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Date and time: </Form.Label>
                            <Form.Control type="datetime-local" name="datetime" defaultValue = {events?date:''} ref={datetimeRef} required/>
                    </Form.Group>

                    {eventImage?.[0]&&
                        <>
                            <button type = 'button' id = 'show' onClick = {getPreviousImgs}>get previous pic(s)</button>
                            <div className='row'>
        
                                {newEventImages?.map((img, index)=>{
                                    return(
                                        
                                        <ul className = 'col' key = {index} >
                                            <img src={img} className="rounded-circle" alt="default" style={{width: '40px', height: '40px'}}/>
                                            <button type ='button' className="btn btn-link" onClick = {()=>{handleDeleteEventImage(index)}}><BsX/></button>
                                        </ul>
                                        
                                    )}    
                                )}   
                            </div>
                        </>  
                    
                    }

                    <Form.Group className="mb-3">
                        <Button variant="link" onClick={handleShow}>Upload Pictures</Button>
                    </Form.Group>
                    
                    {imgObjects&&
                        <>
                            {imgObjects.map((img, index)=>{
                                return(
                                    <ul key = {index}>
                                        <img src={img.url} className="rounded-circle" alt="default" style={{width: '40px', height: '40px'}}/>
                                        {img.photos?.name}
                                        <button type ='button' className="btn btn-link" onClick = {()=>{handleDelete(index)}}><BsX/></button>
                                    </ul>
                                )}
                            )}
                        </>    
                    }
                       
                    <Button variant="danger" type="submit">Submit</Button>
                    
                </Form>
                </CenteredContainer>
                <PopUp handleClose= {handleClose} show = {show} handleUpload={handleUpload} photo={photo} setPhoto={setPhoto} entry = {entry}/>
                </>
            }    
        </>
    )
}