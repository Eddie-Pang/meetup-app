import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FilePond, registerPlugin } from 'react-filepond'

export default function PopUp(props){
    
    const {handleClose, photo, setPhoto, show, handleUpload} = props
   
    return(

        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Set Your Profile Photo</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleUpload}>
                <Modal.Body>
                    <FilePond 
                    allowMultiple={false} 
                    files={photo} 
                    onupdatefiles={(fileItems) => setPhoto(fileItems)} 
                    instantUpload ={false}
                    name="photo"/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>



    )






}