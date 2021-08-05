import React, { useRef, useState } from 'react';
import CenteredContainer from '../CenteredContainer';
import profile from '../../image/default-profile.jpg';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import NavBar from '../NavBar';
import { updateProfileImg, updatePersonalData } from '../../services/userService';
import { loadingIcon } from '../../util/imgPicker'
import PopUp from './PopUp'
import { useUserImagesContext } from "../../Context/UserDataContext";


export default function Profile(){
    const { getUser, currentUser, loading } = useAuth()
    // const [show, setShow] = useState(false)
    // const [photo, setPhoto] = useState()
    const bioRef = useRef()
    const nameRef = useRef()
    const [location, setLocation] = useState("")
    const [gender, setGender] = useState("")
    const [msg, setMsg] = useState("")
    const [error, setError] = useState("")
    const userEmail = currentUser?.email
    const entry = 'profile'
    const {images} = useUserImagesContext();
    const {handleShow, handleClose, photo, setPhoto, show, setShow, arrayBufferToBase64 } = images;

    
    // const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)

    // const arrayBufferToBase64 = buffer => {
    //     var binary = ''
    //     var bytes = [].slice.call(new Uint8Array(buffer))
    //     bytes.forEach(b => binary += String.fromCharCode(b))
    //     return window.btoa(binary)
    // }

    const imgStr = arrayBufferToBase64(currentUser?.img?.data?.data)
    const userProfile = (`data:${currentUser?.img?.contentType};base64,`+ imgStr ) 
    


    const handleUpload = async(e) => {
        e.preventDefault()
        if (photo && photo.length > 0){
            let formData = new FormData()
            formData.append('photo', photo[0].file)
            formData.append('userId', currentUser._id)
            console.log(photo[0].file)
            console.log(currentUser._id)

            await updateProfileImg(formData).then(res =>{
                console.log(res.data)
                console.log('upload successfully')
                setPhoto()
                handleClose()
            }).catch(err => console.log(err))

            getUser();
        }
    }
    const handleOnSubmit = async(e) => {
        e.preventDefault()
        setMsg('')
        setError('')
        const personalInfo = {
            name : nameRef.current.value,
            location: location,
            gender: gender,
            bio: bioRef.current.value
        }
        const id = currentUser?._id
        console.log(personalInfo)
        console.log(id)
        await updatePersonalData(id, personalInfo)
        .then((res) => {
            console.log(res.data)
            setMsg('Data has been completed')
        }).catch(err => {
            console.log(err)
            setError('Failed to complete')
        })
        getUser()

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

                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Your Profile</h2>
                                {currentUser? <h5>Hi, {currentUser.name}</h5>: null}
                                <div style = {{ textAlign:'center'}}>
                                <img src={ currentUser?.img? userProfile: profile } className="rounded-circle" alt="default" style={{width: '120px', height: '120px'}}></img><br/>
                                <Button variant="link" onClick={handleShow}>change your photo</Button>
                                </div>
                    
                                <form onSubmit= {handleOnSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" name="name" defaultValue={currentUser?.name|| ''} ref={nameRef} placeholder="Enter your name"  required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="form-control" id="email" name="email" defaultValue={ userEmail || ''} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="location">Location: </label>
                                        <select className="form-control" id="location" name="location"  onChange={() => setLocation(document.getElementById('location').value)} defaultValue={currentUser?.location || location} required>
                                            <option value="">Please select</option>
                                            <option value="dublin">Dublin</option>
                                            <option value="galway">Galway</option>
                                            <option value="cork">Cork</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gender">Gender: </label>
                                        <select className="form-control" id="gender" name="gender"  onChange={() => setGender(document.getElementById('gender').value)} value={currentUser?.gender || gender} required>
                                            <option value="">Please select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Pefer not to say</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bio">Bio:</label>
                                        <textarea className="form-control" rows="5" id="bio" name="bio" ref={bioRef} defaultValue={currentUser?.bio|| ''}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2">Confirm</button>
                                </form>
                                {msg &&  <div className ="alert alert-success">{msg}</div> } 
                                {error && <div className ="alert alert-danger">{error}</div> }
                                <Link to="#">Reset password</Link>
                                
                            </div>
                        </div>
                    </CenteredContainer>

                    <PopUp handleClose= {handleClose} show = {show} handleUpload={handleUpload} photo={photo} setPhoto={setPhoto} entry = {entry}/>
                    
                </>
            }
        </>
    )
}