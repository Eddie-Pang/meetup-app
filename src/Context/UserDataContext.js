import React, { createContext, useContext, useEffect, useReducer, useCallback, useState, useMemo} from 'react'
import { useAuth } from './AuthContext'
import { getUserObject } from '../services/authService'
import { getCancelToken } from '../services/httpService';
import {  updateAttendees} from '../services/userService'
import { eventsReducer } from './UserDataReducers';


const UserEventsContext = createContext();
const UserImagesContext = createContext();


const UserDataContextProvider = props => {
  
    const { user } = useAuth();
   
    //if something wrong, uncomment 
    const [ currentUser, setCurrentUser ] = useState(getUserObject());
    console.log(currentUser)
    useEffect(()=>{
        setCurrentUser(user);
    },[user]);

    const [eventsState, dispatchEvent] = useReducer(eventsReducer, {
        status: 'init',
        attendees: []
      });
    


  const updateDataBase = useCallback(async (data, event) => {
    console.log(data)
    console.log(event)
    try {
      let response
      let currentUser = getUserObject() //user from token
      if (!currentUser || typeof currentUser === 'undefined') throw new Error('Invalid User');
      response = await updateAttendees(event, data)
   
    } catch (err) {
      const error = err?.response?.data ? err?.response?.data : err
      console.log(error);
      throw new Error(error);
    }

  }, []);
  
  function handleEventViewer(event){
    console.log(event)
    dispatchEvent({ type: 'received', payLoad: event.attendees}) 
  };

  const handleSaveEvent = useCallback(
    async event => {
      dispatchEvent({ type: 'save', payLoad: currentUser?._id }) 
      const newEvent = !event.attendees.some(i => i === currentUser?._id) ? [...event.attendees, currentUser?._id] : [...event.attendees]
      console.log(newEvent)
      try {
        await updateDataBase(newEvent, event)
        console.log(event.attendees)
      } catch (error) {
        dispatchEvent({ type: 'unsave', payLoad: event })
        // dispatchEvent({ type: 'error', payLoad: error })
      }
    },
    [eventsState.attendees, updateDataBase]
  )

  const handleUnsaveEvent = useCallback(
    async event => {
      dispatchEvent({ type: 'unsave', payLoad: currentUser._id })
      console.log(event?.attendees)
      console.log(eventsState.attendees)
      const newEvents = event?.attendees.filter(i => {return i === eventsState.attendees})
      console.log(newEvents)
      try {
        await updateDataBase(newEvents, event)
        console.log(event.attendees)
      } catch (error) {
        dispatchEvent({ type: 'save', payLoad: currentUser._id })
      }
    },
    [eventsState.attendees, updateDataBase]
  )

  




  const eventsObj = {
    events: {
      user: currentUser,
      status: eventsState.status,
      errorMsg: eventsState.errorMsg,
      attendees: eventsState.attendees,
      save: handleSaveEvent,
      unsave: handleUnsaveEvent,
      handleEventViewer:handleEventViewer,
    }
  }

  //imagesObj------------------------------------------------------------
  const [showModal, setShowModal] = useState(false)
  const [photo, setPhoto] = useState()  
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const arrayBufferToBase64 = buffer => {
    var binary = ''
    var bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach(b => binary += String.fromCharCode(b))
    return window.btoa(binary)
}

  //handleClose, photo, setPhoto, show
  const imagesObj = {
    images:{
      handleShow : handleShowModal,
      handleClose : handleCloseModal,
      photo : photo,
      setPhoto : setPhoto,
      show : showModal,   
      setShow: setShowModal,
      arrayBufferToBase64 : arrayBufferToBase64,
    }
  }
  return (
      <UserEventsContext.Provider value={eventsObj}>
        <UserImagesContext.Provider value={imagesObj}>
          {props.children}
        </UserImagesContext.Provider>
      </UserEventsContext.Provider>
  )
}

export const useUserEventsContext = () => {
    const context = useContext(UserEventsContext)
    if (context === undefined) {
      throw new Error(`use in tree : ContextProvider`)
    }
    return context
}
export const useUserImagesContext = () => {
    const context = useContext(UserImagesContext)
    if (context === undefined) {
      throw new Error(`use in tree : ContextProvider`)
    }
    return context

}

export default UserDataContextProvider;