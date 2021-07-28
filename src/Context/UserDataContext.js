import React, { createContext, useContext, useEffect, useReducer, useCallback, useState, useMemo} from 'react'
import { useAuth } from './AuthContext'
import { getUserObject } from '../services/authService'
import { getCancelToken } from '../services/httpService';
import { updateUserEvents} from '../services/userService'
import { eventsReducer } from './UserDataReducers';

import http from '../services/httpService'

const UserEventsContext = createContext();

const UserDataContextProvider = props => {

    const [ currentUser, setCurrentUser ] = useState(getUserObject());
    const { user, isAuth } = useAuth();
    
    useEffect(()=>{
      console.log(user);
        setCurrentUser(user);
    },[user]);

    const [eventsState, dispatchEvent] = useReducer(eventsReducer, {
        status: 'init',
        events: []
      });

   useEffect(() => {
    let isMounted = true
    const source = getCancelToken() // we need to cancel the request if user the component unmounts.

    dispatchEvent({ type: 'requesting' })

    async function requestUserData () {

      try {
        // setStatus('requesting');
        let currentUser = getUserObject();
        console.log(currentUser)
        if (!isMounted) return
        if (!currentUser || typeof currentUser === 'undefined')
          throw new Error('no token'); // setStatus('invalid token');
          else if (isAuth){
            currentUser = await http.get(`/account`, { cancelToken: source.token })
            //   currentUser = await getUser(currentUser, { cancelToken: source.token })
          }

        if (isMounted) {
          console.log(currentUser.data);
          dispatchEvent({ type: 'received', payLoad: currentUser.data.events })
         
        }
      } catch (ex) {
 
        dispatchEvent({ type: 'error', payLoad: ex })
      
        return
      }
    }
    requestUserData()
    return () => {
      isMounted = false
      source.cancel('canceled')
    }
  }, [currentUser])



  const updateDataBase = useCallback(async (data) => {
    try {

      let response
      let currentUser = getUserObject() //user from token
      if (!currentUser || typeof currentUser === 'undefined') throw new Error('Invalid User');
      
      response = await updateUserEvents(currentUser, data)
   
          
    } catch (err) {
      const error = err?.response?.data ? err?.response?.data : err
      console.log(error);
      throw new Error(error);
    }

  }, []);

  const handleSaveEvent = useCallback(
    async event => {
      dispatchEvent({ type: 'save', payLoad: event })
      console.log(eventsState);
      const newEvents = !eventsState.events.some(i => i._id === event?._id) ? [...eventsState.events, event] : [...eventsState.events]
      try {
        await updateDataBase(newEvents)
      } catch (error) {
        dispatchEvent({ type: 'unsave', payLoad: event })
        // dispatchFav({ type: 'error', payLoad: error })
      }
    },
    [eventsState.events, updateDataBase]
  )


  const handleUnsaveEvent = useCallback(
    async recipe => {
      dispatchEvent({ type: 'unsave', payLoad: recipe })
      const newEvents = eventsState.events.filter(i => i._id !== recipe?._id)
      try {
        await updateDataBase(newEvents)
      } catch (error) {
        dispatchEvent({ type: 'save', payLoad: recipe })
      }
    },
    [eventsState.events, updateDataBase]
  )


  const eventsObj = {
    events: {
      status: eventsState.status,
      errorMsg: eventsState.errorMsg,
      events: eventsState.events,
      save: handleSaveEvent,
      unsave: handleUnsaveEvent
    }
  }
  return (
    
      <UserEventsContext.Provider value={eventsObj}>
      
            {props.children}
            
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

export default UserDataContextProvider;