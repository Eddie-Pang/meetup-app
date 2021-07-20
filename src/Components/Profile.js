import React, { useState, useEffect } from 'react';
import CenteredContainer from './CenteredContainer';
import profile from './default-profile.jpg';
import { Link, useHistory } from "react-router-dom";
import { Button, Modal, Form } from 'react-bootstrap';
import { FilePond, registerPlugin } from 'react-filepond'
import { useAuth } from '../Context/AuthContext';


export default function Profile(){
    const [show, setShow] = useState(false)
    const [file, setFile] = useState("")
    const [currentUser, setCurrentUser ] = useState(null)
    const {  getUser, logout } = useAuth()
    const history = useHistory() 
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    async function handleLogOut(){
        let result = await logout()
        if (result.data === 'log out successfully'){
            history.push('/')
        }
    }

    useEffect(() => {
        let isMounted = true; 
         getUser()
        .then(res => {
            if (isMounted) {
                 console.log(res)
                 setCurrentUser(res.data)
                 
            }
         })
        .catch(err => { 
            console.log(err)
         })
         return ()=>{
             isMounted = false;
         }
     }, [])


    return(
        <>
        <CenteredContainer>
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4">Your Profile</h2>
                    {currentUser? <h5>Hi, {currentUser.name}</h5>: null}
                    <div style = {{ textAlign:'center'}}>
                    <img src={profile} className="rounded-circle" alt="default" style={{width: '120px', height: '120px'}}></img><br/>
                    <Button variant="link" >change your photo</Button>
                    </div>
           
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" name="email" readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location: </label>
                            <select className="form-control" id="location" name="location" required>
                                <option value="">Please select</option>
                                <option value="macau">Macau</option>
                                <option value="hk">Hong Kong</option>
                                <option value="taiwan">Taiwan</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender: </label>
                            <select className="form-control" id="gender" name="gender" required>
                                <option value="">Please select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Pefer not to say</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio:</label>
                            <textarea className="form-control" rows="5" id="bio" name="bio"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Confirm</button>
                    </form>
                    <Link to="#">Reset password</Link>
                    <Button variant="secondary" onClick={handleLogOut}>Log out</Button>
                </div>
            </div>
        </CenteredContainer>
        {/* Modal */}
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Set Your Profile Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <Form>
                <Form.Group>
                    <Form.File id="photo-file" name="photo" accept="image/*" label="Please add a photo" />
                </Form.Group>
            </Form> */}
            <FilePond allowMultiple={false} files={file} onupdatefiles={setFile} server="/account" name="photo"/>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        
        </>
    )
}