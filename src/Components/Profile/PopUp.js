import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImagePreview);


export default function PopUp(props){
    
    const {handleClose, photo, setPhoto, show, handleUpload, entry} = props

   
    return(

        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title> {entry==='profile'? 'Set Your Profile Photo' : 'Add picture(s)'} </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleUpload}>
                <Modal.Body>
                    <FilePond 
                    allowMultiple={entry==='profile'?false:true} 
                    files={photo} 
                    onupdatefiles={(fileItems) => setPhoto(fileItems)} 
                    instantUpload ={false}
                    allowRevert = {false}
                    name="photo"
                    allowImagePreview
                    imagePreviewMaxFileSize = "500KB" 
                    imagePreviewHeight = '200' 
                    imagePreviewTransparencyIndicator = 'grid'
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>



    )






}